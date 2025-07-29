import type { FC } from 'react';
import './index.less';
import{ Flex } from 'antd';
import SystemInfo from '../systeminfo';


const HomePage: FC = () => {


  return (
  <SystemInfo>
    <Flex 
      vertical
      className="HomePage-container">
      <div className="home-page-upper">
        <div className='home-page-upper-left'>
          噔噔噔 ੭ ᐕ)੭*⁾⁾
        </div>
        <div className='home-page-upper-right'>
          (´▽｀)ノ♪ 噔噔噔 
        </div>
      </div>
      <div className='home-page-lower'>
        <div className='home-page-lower-text'>
          <p className='home-page-lower-text-style'>
            <span>这是首页</span>
            <span>没想好做什么呢</span>
            <span>┭┮﹏┭┮</span>
            <span>粗粗略地搭了个框架</span>
            <span>只准备做一下曲谱库接上后端和数据库</span>
            <span>因为感觉介绍呀什么的呀用文档形式更方便，就是重复且无聊的工作了</span>
            <span>当然以上都是借口</span>
            <span>是因为鄙人不才做不出炫酷的页面</span>
            <span>(´ . .̫ . `)</span>
            <span>期待大佬学弟学妹们的完善</span>
            <span>——————————————————————————分割线——————————————————————————</span>
            <span>下面是本项目的技术栈</span>
            <span>前端：React + TypeScript + Less + Ant Design + Vite</span>
            <span>后端：FastAPI + Python </span>
            <span>数据库：MongoDB</span>
            <span>开发工具：Visual Studio Code</span>
            <span>版本控制：Git</span>
            <span>部署：Docker</span>
           
            <span>——————————————————————————分割线——————————————————————————</span>
            <span>写一些感受吧</span>
            <span>感觉自己摆摆的</span>
            <span>（摆摆又烂烂）口琴学了一年多吹的比大多数学弟学妹都差（摸摸又鱼鱼）</span>
            <span>但是很开心认识了一些朋友</span>
            <span>一起度过了我充实美好的大一下与大二上</span>
            <span>大二下叛变（bushi）桌游社了</span>
            <span>我们这一届和牢凯的一届的时代也已经要结束了呢</span>
            <span>祝愿以周学妹为首的新一届欣欣向荣</span>
            <span>PS：我知道有两个厉害的计算机大一学弟！！靠你们了！！</span>
            <span>觉得我的代码太诗了也可以通通删掉没关系！！</span>

            <span>——————————————————————————分割线——————————————————————————</span>
            <span>特别感谢（排名不分先后）</span>
            <span>蔡玉萱学姐、邓昕瑶学妹、曹艳茹学姐</span>
            <span>孙哥yyds、cxh、cs</span>
            <span>牢凯、杨琳琳、牢蒋、大哥、肖哥哥、宋沐坤学长</span>
            <span>其他的学弟学妹学长学姐~</span>
            <span>2025/08</span>
          </p>
        </div>
      </div>
    </Flex>
  </SystemInfo>
);
};

export default HomePage;