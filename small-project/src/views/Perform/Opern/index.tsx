import type { FC } from 'react';
import { useState, useEffect } from 'react';
import './index.less';
import { Flex, Input, Tag, Spin, message } from 'antd';
import SystemInfo from '../../systeminfo';
import { 
  SearchOutlined, 
  HeartOutlined,
  HeartFilled,
  FilterOutlined
} from '@ant-design/icons';
import CardItem from './CardItem'; 
import axios from 'axios';

// 卡片数据类型（扩展三级检索所需字段）
interface CardData {
  id?: string | null; // 唯一标识
  _id?: string | { toString: () => string }; // MongoDB原生ID，可能是字符串或对象
  imageUrl: string;
  title: string;
  description: string;
  avatarUrl: string;
  publisher: string;
  time: string;
  harmonicaType: string; // 口琴类型（一级检索）
  songType: string;      // 歌曲种类（二级检索）
  difficulty: string;    // 难度等级（三级检索）
  scoreImageUrl?: string; // 添加谱子图片字段
  isFavorite?: boolean; // 添加收藏状态字段，默认为false
}

// 筛选选项通用类型
interface FilterOption {
  label: string;
  key: string;
}

// 一级筛选：口琴类型
const harmonicaTypeOptions: FilterOption[] = [
  { label: '全部口琴', key: 'all' },
  { label: '半音阶口琴', key: 'chromatic' },
  { label: '复音口琴', key: 'tremolo' },
  { label: '布鲁斯口琴', key: 'blues' },
];

// 二级筛选：歌曲种类
const songTypeOptions: FilterOption[] = [
  { label: '全部种类', key: 'all' },
  { label: '流行', key: 'pop' },
  { label: '古典', key: 'classic' },
  { label: '民谣', key: 'folk' },
  { label: '爵士', key: 'jazz' },
];

// 三级筛选：难度等级
const difficultyOptions: FilterOption[] = [
  { label: '全部难度', key: 'all' },
  { label: '入门', key: 'easy' },
  { label: '进阶', key: 'medium' },
  { label: '专业', key: 'hard' },
];

// API基础URL
const API_BASE_URL = 'http://localhost:8000';

// 从后端获取曲谱数据
const fetchSheetMusic = async (
  harmonicaType: string = 'all',
  songType: string = 'all',
  difficulty: string = 'all',
  keyword: string = ''
): Promise<CardData[]> => {
  try {
    // 使用更明确的类型定义
    interface QueryParams {
      harmonicaType?: string;
      songType?: string;
      difficulty?: string;
      keyword?: string;
    }
    
    // 优化参数构建
    const params: QueryParams = {
      ...(harmonicaType !== 'all' && { harmonicaType }),
      ...(songType !== 'all' && { songType }),
      ...(difficulty !== 'all' && { difficulty }),
      ...(keyword && { keyword })
    };
    
    // 修正API路径：从 '/api/opern/sheet-music' 改为 '/opern/sheets'
    const response = await axios.get(`${API_BASE_URL}/opern/sheets`, {
      params,
      timeout: 5000 // 5秒超时
    });
    
    // 添加数据验证
    if (!Array.isArray(response.data)) {
      console.error('API返回的数据格式不正确:', response.data);
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error('获取曲谱数据失败:', error);
    // 添加更详细的错误提示
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('服务器错误:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('网络错误，无法连接到服务器');
      } else {
        console.error('请求配置错误:', error.message);
      }
    }
    return [];
  }
};

const Opern: FC = () => {
  // 状态管理
  const [inputValue, setInputValue] = useState(''); // 搜索框内容
  const [allCards, setAllCards] = useState<CardData[]>([]); // 从后端获取的数据
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]); // 筛选后的数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // 是否只显示收藏的歌曲
  // 三级筛选选中状态
  const [selectedHarmonica, setSelectedHarmonica] = useState('all');
  const [selectedSongType, setSelectedSongType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  // 已选筛选条件（用于展示和清除）
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);

  // 从后端获取数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 传递当前筛选条件到后端API
        const data = await fetchSheetMusic(
          selectedHarmonica,
          selectedSongType,
          selectedDifficulty,
          inputValue
        );
        
        // 调整过滤逻辑，使其更加灵活
        const validData = data.filter(card => {
          if (!card) return false;
          
          // 更宽松的ID检查，考虑后端可能返回的各种格式
          // 1. 检查是否有id字段且有效
          if (card.id && typeof card.id === 'string' && card.id.trim() !== '') {
            return true;
          }
          // 2. 检查是否有_id字段（MongoDB原生ID）
          const cardWithId = card as CardData & { _id?: string | { toString: () => string } };
          if (cardWithId._id && typeof cardWithId._id === 'string' && cardWithId._id.trim() !== '') {
            // 复制_id到id字段，确保前端一致性
            card.id = cardWithId._id;
            return true;
          }
          // 3. 检查_id是否是对象，可能是ObjectId
          if (cardWithId._id && typeof cardWithId._id === 'object' && cardWithId._id.toString) {
            // 尝试转换ObjectId为字符串
            card.id = cardWithId._id.toString();
            return true;
          }
          
          return false;
        });
        
        // 记录过滤信息
        console.log(`原始数据数量: ${data.length}, 有效数据数量: ${validData.length}`);
        
        setAllCards(validData);
        setFilteredCards(validData);
      } catch (error) {
        message.error('加载曲谱数据失败，请稍后重试');
        console.error('加载数据错误:', error);
      } finally {
        setLoading(false);
      }
    };
    // 设置防抖，避免频繁请求
    const timer = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedHarmonica, selectedSongType, selectedDifficulty, inputValue]);

  // 同步已选筛选条件（用于展示标签）
  useEffect(() => {
    const filters: FilterOption[] = [];
    // 口琴类型
    if (selectedHarmonica !== 'all') {
      const match = harmonicaTypeOptions.find(opt => opt.key === selectedHarmonica);
      if (match) filters.push(match);
    }
    // 歌曲种类
    if (selectedSongType !== 'all') {
      const match = songTypeOptions.find(opt => opt.key === selectedSongType);
      if (match) filters.push(match);
    }
    // 难度等级
    if (selectedDifficulty !== 'all') {
      const match = difficultyOptions.find(opt => opt.key === selectedDifficulty);
      if (match) filters.push(match);
    }
    setActiveFilters(filters);
  }, [selectedHarmonica, selectedSongType, selectedDifficulty]);

  // 处理收藏状态切换
  const handleToggleFavorite = async (id: string | null) => {
    if (!id) return;
    
    try {
      // 调用后端API切换收藏状态
      const response = await axios.put(`${API_BASE_URL}/opern/sheets/${id}/favorite`);
      
      // 使用后端返回的最新状态更新本地数据
      setAllCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? { ...card, isFavorite: response.data.isFavorite } : card
        )
      );
      
      setFilteredCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? { ...card, isFavorite: response.data.isFavorite } : card
        )
      );
      
      // 显示操作成功提示
      message.success(response.data.isFavorite ? '收藏成功' : '取消收藏成功');
    } catch (error) {
      console.error('切换收藏状态失败:', error);
      message.error('操作失败，请稍后重试');
      
      // 如果API调用失败，回滚本地状态
      setAllCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
        )
      );
      
      setFilteredCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
        )
      );
    }
  };

  // 处理收藏筛选切换
  const handleToggleFavoriteFilter = () => {
    setShowFavoritesOnly(prev => !prev);
  };

  // 应用收藏筛选
  useEffect(() => {
    if (showFavoritesOnly) {
      setFilteredCards(allCards.filter(card => card.isFavorite === true));
    } else {
      setFilteredCards(allCards);
    }
  }, [showFavoritesOnly, allCards]);

  // 处理搜索框回车
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 阻止表单默认提交
    }
  };

  // 处理筛选选项点击
  const handleFilterClick = (
    level: 'harmonica' | 'songType' | 'difficulty', 
    key: string
  ): void => {
    switch(level) {
      case 'harmonica':
        setSelectedHarmonica(key);
        break;
      case 'songType':
        setSelectedSongType(key);
        break;
      case 'difficulty':
        setSelectedDifficulty(key);
        break;
    }
  };

  // 清除单个筛选条件
  const clearFilter = (key: string) => {
    if (harmonicaTypeOptions.some(opt => opt.key === key)) {
      setSelectedHarmonica('all');
    } else if (songTypeOptions.some(opt => opt.key === key)) {
      setSelectedSongType('all');
    } else if (difficultyOptions.some(opt => opt.key === key)) {
      setSelectedDifficulty('all');
    }
  };

  // 清除所有筛选条件
  const clearAllFilters = () => {
    setSelectedHarmonica('all');
    setSelectedSongType('all');
    setSelectedDifficulty('all');
    setInputValue('');
  };

  return (
    <SystemInfo>
      <Flex vertical className="opern-container">
        {/* 左侧内容区域 */}
        <div className="opern-left">
          {/* 顶部搜索 + 功能区 */}
          <div className="opern-left-top">
            <div className="opern-left-top-search">
              <Input 
                className="opern-left-top-search-input"
                prefix={<SearchOutlined style={{ fontSize: '30px' }} />}
                allowClear 
                placeholder="搜索曲谱名称..." 
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
              />
            </div>
            <div className="opern-left-top-icon">
              {showFavoritesOnly ? (
                <HeartFilled 
                  style={{ fontSize: '30px', color: '#ff4d4f', marginRight: '16px', cursor: 'pointer' }} 
                  title="收藏夹（已激活）"
                  onClick={handleToggleFavoriteFilter}
                />
              ) : (
                <HeartOutlined 
                  style={{ fontSize: '30px', color: '#707070ff', marginRight: '16px', cursor: 'pointer' }} 
                  title="收藏夹"
                  onClick={handleToggleFavoriteFilter}
                />
              )}
            </div>
          </div>

          {/* 筛选条件展示区 */}
          {activeFilters.length > 0 && (
            <div className="active-filters-bar">
              <div className="filters-header">
                <FilterOutlined style={{ marginRight: '8px' }} />
                <span>已选筛选条件：</span>
                <Tag 
                  color="default" 
                  closable 
                  onClose={clearAllFilters}
                  style={{ marginLeft: '8px', cursor: 'pointer' }}
                >
                  清除全部
                </Tag>
              </div>
              <div className="filters-tags">
                {activeFilters.map(filter => (
                  <Tag 
                    key={filter.key} 
                    color="#1890ff" 
                    closable
                    onClose={() => clearFilter(filter.key)}
                  >
                    {filter.label}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          <div className="filter-levels">
            {/* 一级：口琴类型 */}
            <div className="filter-group">
              <span className="filter-group-label">口琴类型：</span>
              <div className="filter-options-row">
                {harmonicaTypeOptions.map(option => (
                  <div
                    key={option.key}
                    className={`filter-item ${
                      selectedHarmonica === option.key ? 'filter-item-active' : ''
                    }`}
                    onClick={() => handleFilterClick('harmonica', option.key)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>

            {/* 二级：歌曲种类 */}
            <div className="filter-group">
              <span className="filter-group-label">歌曲种类：</span>
              <div className="filter-options-row">
                {songTypeOptions.map(option => (
                  <div
                    key={option.key}
                    className={`filter-item ${
                      selectedSongType === option.key ? 'filter-item-active' : ''
                    }`}
                    onClick={() => handleFilterClick('songType', option.key)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>

            {/* 三级：难度等级 */}
            <div className="filter-group">
              <span className="filter-group-label">难度等级：</span>
              <div className="filter-options-row">
                {difficultyOptions.map(option => (
                  <div
                    key={option.key}
                    className={`filter-item ${
                      selectedDifficulty === option.key ? 'filter-item-active' : ''
                    }`}
                    onClick={() => handleFilterClick('difficulty', option.key)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 卡片列表区 */}
          <div className="opern-left-bottom-context">
            {loading ? (
              <div className="loading-state">
                <Spin size="large" tip="加载中..." />
              </div>
            ) : filteredCards.length > 0 ? (
              filteredCards.map((card, index) => (
                <CardItem 
                  key={card.id || `card-${index}`} // 提供后备key
                  id={card.id || null} // 确保传递有效ID或null
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                  avatarUrl={card.avatarUrl}
                  publisher={card.publisher}
                  time={card.time}
                  type={`${
                    harmonicaTypeOptions.find(opt => opt.key === card.harmonicaType)?.label || ''
                  } · ${card.difficulty === 'easy' ? '入门' : card.difficulty === 'medium' ? '进阶' : '专业'}`}
                  isFavorite={card.isFavorite || false}
                  onToggleFavorite={() => handleToggleFavorite(card.id || null)}
                />
              ))
            ) : (
              <div className="empty-state">
                {showFavoritesOnly ? '暂无收藏的曲谱' : '没有找到符合条件的曲谱，请尝试调整筛选条件'}
              </div>
            )}
          </div>
        </div>

        {/* 右侧占位（可扩展内容） */}
        {/* <div className="opern-right">
          <div className="opern-right-bottom"></div>
        </div> */}
      </Flex>
    </SystemInfo>
  );
};

export default Opern;