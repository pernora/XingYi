import type { FC } from 'react';
import { useState } from 'react';
import './index.less';
import { 
  Layout, Menu, Collapse, Typography, Divider, 
  Badge, Space, BackTop ,Button 
} from 'antd';
import SystemInfo from '../../systeminfo';
import { 
  BookOutlined, MinusOutlined, PlayCircleOutlined, 
  StarOutlined,DownloadOutlined 
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text, Link } = Typography;
const { Panel } = Collapse;

// 口琴宝典内容结构（保持不变）
const harmonicaBibleData = [
  {
    key: 'introduction',
    title: '口琴介绍',
    icon: <MinusOutlined />,
    sections: [
      {
        key: 'chromatic',
        title: '半音阶口琴',
        content: (
          <Paragraph>
            半音阶口琴是一种具有丰富表现力的口琴，通过推键可以实现半音的演奏，音域宽广（通常为12-16孔），
            适合演奏古典、爵士、流行等多种风格的音乐。其结构精密，每个音孔包含吹吸两个音，
            推下按键时音高上升半音，能演奏完整的12平均律音阶，是专业演奏者常用的乐器。
          </Paragraph>
        )
      },
      {
        key: 'tremolo',
        title: '复音口琴',
        content: (
          <Paragraph>
            复音口琴是最常见的口琴类型之一，每个音孔上下有两个音高相同的簧片，吹奏时产生自然的颤音效果。
            通常为16-24孔，分为C调、D调等多种调性，适合演奏民谣、流行音乐。
            优点是容易上手，价格亲民，是初学者的理想选择。演奏时可通过单孔含法或多孔含法表现不同效果。
          </Paragraph>
        )
      },
      {
        key: 'blues',
        title: '布鲁斯口琴（十孔口琴）',
        content: (
          <Paragraph>
            布鲁斯口琴共10个音孔，每个音孔包含吹吸两个音，音域相对较窄但音色独特，尤其适合演奏布鲁斯、摇滚等风格。
            通过特殊的压音（bending）技巧可以演奏出半音，具有很强的表现力。
            体积小巧便携，常被用于街头表演和乐队伴奏，是蓝调音乐的标志性乐器。
          </Paragraph>
        )
      },
      {
        key: 'summary',
        title: '总结',
        content: (
          <Paragraph>
            三种口琴各有特色：半音阶口琴适合追求全面表现力和复杂乐曲的演奏者；
            复音口琴易于入门，适合民谣和大众音乐；布鲁斯口琴则在蓝调、摇滚等风格中独具魅力。
            初学者可根据自身音乐喜好选择，建议从复音口琴或布鲁斯口琴入手，掌握基础后再尝试半音阶口琴。
          </Paragraph>
        )
      }
    ]
  },
  {
    key: 'music-theory',
    title: '基本乐理知识',
    icon: <BookOutlined />,
    sections: [
      {
        key: 'basic-notes',
        title: '基本音和音的关系',
        content: (
          <Paragraph>
            音是由物体振动产生的声波，基本音包括C、D、E、F、G、A、B七个自然音，它们之间存在全音和半音的关系。
            在音乐中，音的高低、长短、强弱和音色是构成音乐的基本要素。
          </Paragraph>
        )
      },
      {
        key: 'semitone',
        title: '半音和十二平均律',
        content: (
          <Paragraph>
            十二平均律是将一个八度平均分成12个相等的半音，相邻两个半音的频率比是固定的。
            这一体系使得音乐可以自由转调，是现代音乐理论的基础。半音是音乐中最小的音高距离。
          </Paragraph>
        )
      },
      {
        key: 'key-conversion',
        title: '音调和调式转化',
        content: (
          <Paragraph>
            音调指音乐作品中起核心作用的音（主音）的高度，调式则是围绕主音形成的音的组织体系。
            不同调式具有不同的音乐色彩，调式转化可以丰富音乐的表现力。
          </Paragraph>
        )
      },
      {
        key: 'rhythm',
        title: '节奏与时值',
        content: (
          <Paragraph>
            节奏是音乐中音符的长短和强弱的组合，时值表示音符持续的时间。
            常见的时值有全音符、二分音符、四分音符、八分音符等，它们之间存在固定的比例关系（如1个全音符=2个二分音符）。
          </Paragraph>
        )
      },
      {
        key: 'sheet-music',
        title: '怎么认简谱与五线谱',
        content: (
          <div>
            <Paragraph>
              简谱用数字1-7表示基本音级，上方加点表示高音，下方加点表示低音，数字后加横线表示时值延长。
            </Paragraph>
            <Paragraph>
              五线谱通过音符在五条线和间的位置表示音高，不同的音符形状表示不同时值，谱号（高音、低音）决定音高基准。
            </Paragraph>
          </div>
        )
      }
    ]
  },
  {
    key: 'practice',
    title: '演奏规范及练习',
    icon: <PlayCircleOutlined />,
    sections: [
      {
        key: 'breathing',
        title: '腹式呼吸',
        content: (
          <div>
            <Paragraph>
              腹式呼吸是口琴演奏的基础，通过横膈膜的运动带动肺部呼吸，而非胸部扩张。
              优点是气息更深、更稳定，能支持长时间演奏和强弱变化。
            </Paragraph>
            <Paragraph>
              练习方法：平躺时将手放在腹部，感受呼吸时腹部的起伏；站立时保持上身放松，
              吸气时腹部鼓起，呼气时腹部收缩，循序渐进练习。
            </Paragraph>
          </div>
        )
      },
      {
        key: 'posture',
        title: '演奏姿势',
        content: (
          <div>
            <Paragraph>
              通用姿势：身体直立，双肩放松，头部自然平视，琴身与身体保持约45度角，避免耸肩或弯腰。
            </Paragraph>
            <Paragraph>
              半音阶口琴：双手握住琴身两端，右手拇指可辅助推键操作，手腕灵活以便快速移动。
            </Paragraph>
            <Paragraph>
              复音口琴：通常用左手持琴，右手辅助稳定，可根据需要转动琴身调整角度。
            </Paragraph>
            <Paragraph>
              布鲁斯口琴：单手持琴，食指和中指夹住琴身，拇指在一侧辅助固定，便于快速移动和技巧操作。
            </Paragraph>
          </div>
        )
      },
      {
        key: 'beginner-issues',
        title: '萌新常见问题',
        content: (
          <ul style={{ paddingLeft: 20 }}>
            <li><Text>气息不稳：每天进行10分钟腹式呼吸练习，从慢节奏开始</Text></li>
            <li><Text>音准偏差：对照标准音练习，使用调音器辅助</Text></li>
            <li><Text>口水问题：保持正确含琴角度，定期清理琴身</Text></li>
            <li><Text>进度缓慢：制定每日练习计划，注重基础而非速度</Text></li>
          </ul>
        )
      },
      {
        key: 'exercises',
        title: '练习曲推荐',
        content: (
          <div className="custom-card">
            <Space direction="vertical" size="middle">
              <div>
                <Title level={5}>不含半音的简单练习曲</Title>
                <Text>《小星星》《欢乐颂》《两只老虎》（适合掌握基本音阶和气息）</Text>
              </div>
              <div>
                <Title level={5}>含半音练习曲</Title>
                <Text>《City of stars》《斯卡布罗集市》《腐草为萤》</Text>
              </div>
            </Space>
          </div>
        )
      }
    ]
  },
  {
    key: 'skills',
    title: '口琴技巧',
    icon: <StarOutlined />,
    sections: [
      {
        key: 'basic-skills',
        title: '基础技巧',
        content: (
          <div>
            <Paragraph><strong>连奏</strong>：音符之间平滑过渡，保持气息连贯，避免中断</Paragraph>
            <Paragraph><strong>断奏</strong>：每个音符清晰分离，通过舌尖轻触琴孔或气息停顿实现</Paragraph>
            <Paragraph><strong>震音</strong>：快速交替吹奏相邻音孔或通过气息强弱变化产生颤抖效果</Paragraph>
          </div>
        )
      },
      {
        key: 'advanced-skills',
        title: '进阶技巧',
        content: (
          <div>
            <Paragraph><strong>气振音</strong>：通过腹部控制气息强弱波动，产生自然的音量变化</Paragraph>
            <Paragraph><strong>滑音</strong>：快速滑动含琴位置，使音高平滑过渡（常见于布鲁斯口琴）</Paragraph>
            <Paragraph><strong>压音</strong>：布鲁斯口琴特有技巧，通过改变口腔形状和气息压力降低音高半音</Paragraph>
            <Paragraph><strong>哇音</strong>：用手捂住琴身部分孔位并快速开合，产生"哇-哇"效果</Paragraph>
          </div>
        )
      },
      {
        key: 'practice-advice',
        title: '日常练习建议',
        content: (
          <ul style={{ paddingLeft: 20 }}>
            <li><Text>每日坚持15-30分钟练习，胜于偶尔长时间练习</Text></li>
            <li><Text>先慢后快，确保每个音符清晰、准确</Text></li>
            <li><Text>结合节拍器练习节奏感，从慢速开始（60-80BPM）</Text></li>
            <li><Text>录音回听，发现自身演奏问题并针对性改进</Text></li>
            <li><Text>定期学习新技巧，但不忽视基础巩固</Text></li>
          </ul>
        )
      }
    ]
  }
];

const Technology: FC = () => {
  const [currentSection, setCurrentSection] = useState('introduction');

  // 处理菜单点击，显式声明key类型
  const handleMenuClick = ({ key }: { key: string }) => {
    setCurrentSection(key);
  };

  const pdfUrl = '../../../../public/星一口琴协会教材2024版.pdf'

  return (
    <SystemInfo>
      <Layout className="harmonica-bible-container">
        {/* 顶部标题栏 - 新增PDF链接 */}
        <Header className="bible-header">
          <div className="header-content">
            <Title level={3} className="header-title">
              <BookOutlined style={{ marginRight: 8 }} />
              星一口琴宝典
            </Title>
            <div className="header-actions">
              {/* PDF下载/查看按钮 */}
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                href={pdfUrl} 
                target="_blank"  // 新窗口打开
                rel="noopener noreferrer"
                size="middle"
              >
                下载完整PDF
              </Button>
              <Badge count="新手必备" size="large" color="#1890ff" style={{ marginLeft: 16 }} />
            </div>
          </div>
        </Header>

        <Layout>
          {/* 左侧导航（保留，用于切换大章节） */}
          <Sider width={260} className="bible-sider">
            <Menu
              mode="inline"
              selectedKeys={[currentSection]}
              onClick={handleMenuClick}
              className="sider-menu"
            >
              {harmonicaBibleData.map((chapter) => (
                <Menu.Item 
                  key={chapter.key} 
                  icon={chapter.icon}
                  className="chapter-item"
                >
                  {chapter.title}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>

          {/* 主内容区 */}
          <Content className="bible-content">
            <div className="content-inner">
              {/* 内容展示 */}
              {harmonicaBibleData.map((chapter) => (
                <div 
                  key={chapter.key} 
                  className={`chapter-content ${currentSection === chapter.key ? 'active' : ''}`}
                >
                  <Title level={2} className="chapter-title">
                    {chapter.icon}
                    <span style={{ marginLeft: 8 }}>{chapter.title}</span>
                  </Title>
                  <Divider orientation="left" />
                  
                  <Collapse 
                    bordered={false} 
                    defaultActiveKey={[chapter.sections[0].key]}
                    className="section-collapse"
                  >
                    {chapter.sections.map((section) => (
                      <Panel 
                        key={section.key}
                        id={`${chapter.key}-${section.key}`}
                        header={
                          <Title level={4} className="section-header">
                            {section.title}
                          </Title>
                        }
                        className="section-panel"
                      >
                        <div className="section-content">
                          {section.content}
                          {/* 练习曲查看入口（保留功能） */}
                          {section.key === 'exercises' && (
                            <div className="exercise-actions" style={{ marginTop: 16 }}>
                              <Link type="primary" icon={<PlayCircleOutlined />}>
                                请下载完整PDF详细查看练习曲谱
                              </Link>
                            </div>
                          )}
                        </div>
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              ))}
            </div>
          </Content>
        </Layout>

        {/* 回到顶部按钮（保留，提升长页面浏览体验） */}
        <BackTop 
          className="back-to-top"
          visibilityHeight={300}
          style={{ right: 30, bottom: 30 }}
        />
      </Layout>
    </SystemInfo>
  );
};

export default Technology;