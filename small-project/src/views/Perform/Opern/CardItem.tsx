import React from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; // 添加antd的message组件
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './CardItem.less';

interface CardItemProps {
  id: string | null;
  imageUrl: string;
  title: string;
  description: string;
  avatarUrl: string;
  publisher: string;
  time: string;
  type: string;
  isFavorite: boolean; // 添加收藏状态属性
  onToggleFavorite: (id: string | null) => void; // 添加收藏切换处理函数
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  imageUrl,
  title,
  description,
  avatarUrl,
  publisher,
  time,
  type,
  isFavorite,
  onToggleFavorite
}) => {
  const navigate = useNavigate();

  // 点击卡片导航到详情页
  const handleCardClick = () => {
    console.log('导航到详情页，传递的id类型:', typeof id);
    console.log('导航到详情页，传递的id值:', id);
    // 更宽松的ID验证
    if (id && typeof id === 'string' && id.trim() !== '') {
      navigate(`/opern/detail/${id}`);
    } else {
      console.error('无效的ID，无法导航:', id);
      message.error('该曲谱信息不完整，无法查看详情');
    }
  };

  // 处理收藏按钮点击，阻止冒泡到卡片点击事件
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  return (
    <div 
      className="card-item" 
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* 顶部封面图 + 类型标签区域 */}
      <div className="card-top">
        <img src={imageUrl} alt="card cover" />
        <span className="card-type-tag">{type}</span>
      </div>
      {/* 标题与简介区域 - 修改添加收藏按钮 */}
      <div className="card-middle">
        <div className="card-title-container">
          <h3 className="card-title">{title}</h3>
          <button 
            className="favorite-button"
            onClick={handleFavoriteClick}
            title={isFavorite ? "取消收藏" : "收藏"}
          >
            {isFavorite ? 
              <HeartFilled style={{ color: '#ff4d4f', fontSize: '18px' }} /> : 
              <HeartOutlined style={{ color: '#999', fontSize: '18px' }} />
            }
          </button>
        </div>
        <p className="card-description">{description}</p>
      </div>
      {/* 底部发布者、头像、时间区域 */}
      <div className="card-bottom">
        <div className="publisher-info">
          {/* 圆形头像 */}
          <img className="publisher-avatar" src={avatarUrl} alt="publisher avatar" />
          <span className="publisher-name">{publisher}</span>
        </div>
        <span className="card-time">{time}</span>
      </div>
    </div>
  );
};

export default CardItem;