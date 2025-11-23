import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './OpernDetail.less';

import userAvatarLogo from '../../../assets/img/logo.jpg';

interface CardData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  avatarUrl: string;
  publisher: string;
  time: string;
  harmonicaType: string;
  songType: string;
  difficulty: string;
  scoreImageUrl?: string; // 添加谱子图片字段
}

// 新增评论接口
interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  time: string;
  likes: number;
}

const API_BASE_URL = 'http://localhost:8000';

// 获取单个曲谱详情的函数
const fetchSheetDetail = async (id: string): Promise<CardData | null> => {
  try {
    // 使用正确的API路径
    const response = await axios.get(`${API_BASE_URL}/opern/sheets/${id}`, {
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error('获取曲谱详情失败:', error);
    return null;
  }
};

// 难度等级映射
const difficultyMap = {
  easy: '入门',
  medium: '进阶',
  hard: '专业'
};

// 口琴类型映射
const harmonicaTypeMap = {
  chromatic: '半音阶口琴',
  tremolo: '复音口琴',
  blues: '布鲁斯口琴'
};

// 歌曲种类映射
const songTypeMap = {
  pop: '流行',
  classic: '古典',
  folk: '民谣',
  jazz: '爵士'
};

// 修改模拟评论数据中的头像路径
const mockComments: Comment[] = [
  {
    id: '1',
    userName: '口琴爱好者',
    userAvatar: userAvatarLogo,
    content: '这首曲子的编排非常好，很适合初学者练习！我已经练了两天，感觉进步很大。',
    time: '2024-01-15 10:30',
    likes: 12
  },
  {
    id: '2',
    userName: '音乐达人',
    userAvatar: userAvatarLogo,
    content: '这个版本的和弦编配很有特色，特别是副歌部分的处理很巧妙。',
    time: '2024-01-14 16:45',
    likes: 8
  },
  {
    id: '3',
    userName: '新手学习中',
    userAvatar: userAvatarLogo,
    content: '请问这个地方应该用什么技巧演奏？我总是吹不好那几个音。',
    time: '2024-01-13 09:12',
    likes: 3
  }
];

const OpernDetail: React.FC = () => {
  // 使用useParams获取路由参数
  const params = useParams();
  // 使用useLocation获取当前位置信息
  const location = useLocation();
  const navigate = useNavigate();
  
  // 从params获取ID，如果为undefined，则尝试从URL中解析
  let id = params.id as string | undefined;
  
  // 备用方案：直接从URL hash中解析ID
  if (!id) {
    const hash = window.location.hash;
    console.log('当前URL hash:', hash);
    // 匹配 /opern/detail/ 后面的ID部分
    const idMatch = hash.match(/\/opern\/detail\/([^\\/]+)/);
    if (idMatch && idMatch[1]) {
      id = idMatch[1];
      console.log('从URL中解析的ID:', id);
    }
  }
  
  const [sheetData, setSheetData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  // 新增评论状态
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 添加提交状态

  useEffect(() => {
    const loadDetail = async () => {
      // 添加更详细的日志记录
      console.log('完整的params对象:', params);
      console.log('useParams获取的id:', params.id);
      console.log('处理后使用的id:', id);
      console.log('当前location.pathname:', location.pathname);
      console.log('当前location.search:', location.search);
      console.log('当前location.hash:', location.hash);
      
      // 增强id参数检查
      if (!id || id === 'undefined' || id.trim() === '') {
        console.error('ID参数未定义或无效');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const data = await fetchSheetDetail(id);
        console.log('获取到的曲谱数据:', data);
        setSheetData(data);
      } catch (error) {
        console.error('加载详情失败:', error);
        setSheetData(null);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [id, params, location]);

  // 处理评论点赞
  const handleLikeComment = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  // 处理提交评论
const handleSubmitComment = async () => {
  if (!newComment.trim() || isSubmitting) return;
  
  setIsSubmitting(true);
  try {
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      userName: '当前用户', // 实际应用中应该从登录状态获取
      userAvatar: userAvatarLogo,
      content: newComment,
      time: new Date().toLocaleString(),
      likes: 0
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  } catch (error) {
    console.error('提交评论失败:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  // 处理回车提交评论
  const handleCommentKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  if (loading) {
    return (
      <div className="opern-detail-loading">
        <div className="loading-spinner">加载中...</div>
      </div>
    );
  }

  if (!sheetData) {
    return (
      <div className="opern-detail-error">
        <h2>曲谱不存在或已被删除</h2>
        <button
          className="back-button"
          onClick={() => navigate('/opern')}
        >
          返回曲谱列表
        </button>
      </div>
    );
  }

  return (
    <div className="opern-detail-container">
      {/* 返回按钮 */}
      <button
        className="back-button"
        onClick={() => navigate('/opern')}
      >
        返回曲谱列表
      </button>

      {/* 曲谱详情卡片 - 两栏布局 */}
      <div className="opern-detail-card">
        {/* 左侧：曲谱内容区域 */}
        <div className="score-section">
          <div className="score-content">
            <h3>曲谱内容</h3>
            {sheetData?.scoreImageUrl ? (
              <div className="score-placeholder">
                <img 
                  src={sheetData.scoreImageUrl} 
                  alt={`${sheetData.title}谱子`} 
                  className="score-image"
                />
              </div>
            ) : (
              <div className="score-placeholder">
                <p>曲谱预览区域</p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：其他信息区域 */}
        <div className="info-section">
          {/* 封面图 */}
          <div className="detail-cover">
            <img src={sheetData.imageUrl} alt={sheetData.title} className="cover-image" />
          </div>

          <div className="divider"></div>

          {/* 基本信息 */}
          <div className="detail-header">
            <div className="detail-title-section">
              <h1 className="detail-title">{sheetData.title}</h1>
              <div className="detail-tags">
                <span className="tag blue">{harmonicaTypeMap[sheetData.harmonicaType as keyof typeof harmonicaTypeMap]}</span>
                <span className="tag green">{songTypeMap[sheetData.songType as keyof typeof songTypeMap]}</span>
                <span
                  className={`tag ${sheetData.difficulty === 'easy' ? 'easy' : 
                         sheetData.difficulty === 'medium' ? 'medium' : 'hard'}`}
                >
                  {difficultyMap[sheetData.difficulty as keyof typeof difficultyMap]}
                </span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* 详细描述 */}
          <div className="detail-content">
            <h3>曲谱说明</h3>
            <p className="detail-description">{sheetData.description}</p>
          </div>

          <div className="divider"></div>

          {/* 发布信息 */}
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">发布者</span>
              <div className="publisher-info">
                <img
                  src={sheetData.avatarUrl}
                  alt={sheetData.publisher}
                  className="publisher-avatar"
                />
                <span className="publisher-name">{sheetData.publisher}</span>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-label">发布时间</span>
              <span className="meta-value">{sheetData.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 评论区 - 改进后的样式 */}
      <div className="comments-section">
        <div className="comments-header">
          <h2>评论区</h2>
          <span className="comments-count">({comments.length})</span>
        </div>
        
        {/* 评论输入框 */}
        <div className="comment-input-section">
          <div className="user-avatar-small">
            <img src={userAvatarLogo} alt="Your avatar" />
          </div>
          <div className="comment-input-container">
            <textarea
              className="comment-textarea"
              placeholder="分享你的演奏心得或提问..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleCommentKeyPress}
              rows={3}
            />
            <div className="comment-actions">
              <span className="comment-hint">按 Enter 发布，Shift + Enter 换行</span>
              <button 
                className={`submit-comment-btn ${!newComment.trim() || isSubmitting ? 'disabled' : ''}`}
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? '发布中...' : '发布评论'}
              </button>
            </div>
          </div>
        </div>
        
        {/* 评论列表 */}
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-avatar">
                  <img src={comment.userAvatar} alt={comment.userName} />
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.userName}</span>
                    <span className="comment-time">{comment.time}</span>
                  </div>
                  <p className="comment-text">{comment.content}</p>
                  <div className="comment-footer">
                    <button 
                      className="like-button"
                      onClick={() => handleLikeComment(comment.id)}
                      title="点赞"
                    >
                      <span className="like-icon">♥</span>
                      <span className="like-count">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-comments">
              <p>暂无评论，来发表第一条评论吧！</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpernDetail;