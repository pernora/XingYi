import type { FC } from 'react';
import './index.less';

import SystemInfo from '../systeminfo';
// 图片引入
// 保持成功的导入方式
import groupPhotoImg from "../../assets/img/group.jpg";
import starOneLogo from "../../assets/img/logo.jpg";
import concertImg from "../../assets/img/corner.jpg";  
import playGroundImg from "../../assets/img/play.jpeg"; 

// 社团历史时间轴数据
const historyTimelineData = [
  { year: '2014', content: '马房山校区陈庆荣学长组建10人小团体，定名"星一"；余家头校区成立"Bluestarry"口琴组织' },
  { year: '2015', content: '马区人数达50人，固定博广西侧活动场地；余区随笛箫协会参与湖北大学音乐会' },
  { year: '2016', content: '马区挂靠笛箫协会首次参与百团招新；余区王哲学长在华师音乐会演唱《月半小夜曲》' },
  { year: '2017-2018', content: '段旭推广半音阶口琴并编写首版教材；2018年两校区合并为武汉理工大学星一口琴社，举办首届新生音乐会' },
  { year: '2019', content: '获评校三星级社团；举办"星河呓梦"主题音乐会；组建首支口琴重奏组；更新第二版教材' },
  { year: '2020-2021', content: '疫情期间推出B站线上教学视频；参与"建党一百周年美育成果展演"；举办"一期一会"毕业主题音乐会' },
  { year: '2022-2023', content: '创新"线下统一教学+线上自学"模式；联合外校举办线上新春会；申报"星海徜徉"重点音乐会项目' },
  { year: '2023-2024', content: '恢复百团路演打破纳新困境；举办"飞星之旅"音乐会、斗琴大赛；推出"小星"Q版形象' },
  { year: '2024-至今', content: '故事未完待续......'}
];

// 核心活动数据
const activityData = [
  {
    title: '日常活动',
    items: [
      '每日21:00-22:00 博学广场西侧口琴角（互助练习）',
      '每周周末14:30-17:00 余家头水运湖大口琴角（复习交流）',
      'B站投稿比赛（奖励制鼓励传播口琴音乐）'
    ],
    icon: '🎵'
  },
  {
    title: '学期活动',
    items: [
      '上半学期期末：学期音乐会（新老社员曲目展示）',
      '下半学期开学第二周：斗琴大赛（检验假期练琴成果）'
    ],
    icon: '🎶'
  },
  {
    title: '年度活动',
    items: [
      '毕业季主题音乐会（欢送毕业生，展现社团风采）',
      '跨校交流活动（与武大、华师等高校口琴社合作）'
    ],
    icon: '🎤'
  }
];

// 部门职能数据
const departmentData = [
  { name: '核心管理组', members: '社长1名 + 团支书1名 + 副社长1-3名', duty: '协调部门工作、组织团日活动、培训干部、统筹社团运营' },
  { name: '组织部', duty: '场地申请、物品管理、教练员安排、教学计划制定、跨校联系' },
  { name: '秘书部', duty: '图表制作、账目统计、入社登记、活动策划、财务报账' },
  { name: '宣传部', duty: '宣传物料设计（海报/传单）、活动记录留影、官Q/B站/贴吧运营' },
  { name: '器乐部', duty: '重奏组编排、曲目推荐、技术指导、乐谱搜集整理、晚会节目排演' }
];

// 加入方式数据
const joinData = {
  mainWay: '每年"百团大战"现场报名',
  otherWay: '通过社团线上平台获取信息后联系报名',
  contact: [
    { name: '官Q', value: '1263968855' },
    { name: 'B站', value: '武汉理工大学星一口琴社' },
    { name: 'QQ群', value: '931810409' },
    { name: '贴吧', value: '武汉理工大学星一口琴协会吧' }
  ]
};

const HomePage: FC = () => {
  return (
    <SystemInfo>
      <div className="HomePage-container">
        {/* 头部Banner区域 */}
        <div className="HomePage-banner">
          <div className="banner-content">
            <img 
              src={starOneLogo} 
              alt="星一口琴社社徽" 
              className="logo"
            />
            <div className="banner-text">
              <h1 className="banner-title">武汉理工大学星一口琴社</h1>
              <p className="banner-subtitle">星空下，一路相伴，一起成长</p>
              <span className="banner-tag">2014年成立 · 校四星级社团</span>
            </div>
          </div>
        </div>

        {/* 社团简介区域 */}
        <div className="card">
          <h2 className="section-title">社团简介</h2>
          <div className="divider"></div>
          <div className="grid-container">
            <div className="grid-item">
              <div className="sub-card">
                <div className="card-image">
                  <img 
                    src={playGroundImg} 
                    alt="社团合影" 
                  />
                </div>
                <div className="card-meta">
                  <h3 className="card-title">社团概况</h3>
                  <p className="card-description">
                    星一口琴社成立于2014年，由马房山校区与余家头校区口琴组织合并发展而来。
                    历经十年成长，已从最初10人小团体发展为校三星级社团，现有成员200余人，
                    以半音阶口琴为核心，兼顾十孔、复音口琴，形成"日常练习+主题音乐会+跨校交流"的完善活动体系。
                  </p>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <div className="sub-card">
                <div className="card-image">
                  <img 
                    src={concertImg} 
                    alt="音乐会现场" 
                  />
                </div>
                <div className="card-meta">
                  <h3 className="card-title">核心成果</h3>
                  <p className="card-description">
                    编写2版口琴教学教材，组建专属口琴重奏组，累计举办20+场主题音乐会，
                    参与"建党一百周年美育成果展演"等校级重大活动，与武汉大学、华中师范大学等高校口琴社建立长期交流合作，
                    打造B站线上教学平台，形成"线上+线下"融合的教学模式。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 社团历史时间轴 */}
        <div className="card">
          <h2 className="section-title">社团发展历程</h2>
          <div className="divider"></div>
          <div className="timeline">
            {historyTimelineData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                {/* <div className="timeline-dot">{index + 1}</div> */}
                <p className="timeline-content">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 活动与部门区域 */}
        <div className="card">
          <div className="grid-container">
            {/* 活动展示 */}
            <div className="grid-item">
              <h2 className="section-title">核心活动</h2>
              <div className="activity-cards">
                {activityData.map((activity, index) => (
                  <div key={index} className="activity-card">
                    <h3 className="activity-title">
                      <span className="activity-icon">{activity.icon}</span>
                      {activity.title}
                    </h3>
                    <div className="activity-items">
                      {activity.items.map((item, i) => (
                        <div key={i} className="activity-item">
                          <div className="activity-bullet"></div>
                          <p className="activity-text">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 部门介绍 */}
            <div className="grid-item">
              <h2 className="section-title">部门职能</h2>
              <div className="department-cards">
                {departmentData.map((dept, index) => (
                  <div key={index} className="department-card">
                    <div>
                      <h3 className="department-title">{dept.name}</h3>
                      {dept.members && (
                        <span className="department-members">{dept.members}</span>
                      )}
                      <p className="department-duty">{dept.duty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 加入我们区域 */}
        <div className="join-us">
          <div className="join-image">
            <img 
              src={groupPhotoImg} 
              alt="秋游活动" 
            />
          </div>
          <div className="join-content">
            <h2 className="section-title">加入我们</h2>
            <div className="divider"></div>
            <div className="join-section">
              <div className="join-info">
                <h3 className="join-subtitle">报名方式</h3>
                <p className="join-text">{joinData.mainWay}</p>
                <p>或 {joinData.otherWay}</p>
                <span className="banner-tag" style={{ backgroundColor: '#52c41a' }}>新成员可获得入门教学指导</span>
              </div>
              <div className="divider" style={{ width: '1px', height: 'auto', margin: '0 24px' }}></div>
              <div className="join-info">
                <h3 className="join-subtitle">联系我们</h3>
                <div className="join-contact">
                  {joinData.contact.map((item, index) => (
                    <a 
                      key={index} 
                      href={item.name === 'B站' ? 'https://space.bilibili.com/' : '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-link"
                    >
                      <div className="contact-item">
                        <span className="contact-tag">{item.name}</span>
                        <p className="contact-value">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权区域 */}
        <div className="footer">
          <p className="footer-text">© 2024 武汉理工大学星一口琴社 版权所有</p>
        </div>
      </div>
    </SystemInfo>
  );
};

export default HomePage;