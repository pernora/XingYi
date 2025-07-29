import type { FC } from 'react';
import './index.less';
import { Flex, Menu } from 'antd';
import type { MenuProps } from 'antd';
import{Link} from 'react-router-dom';

type SystemInfoProps = {
  children?: React.ReactNode;  // Made children optional and used full namespace
};

const SystemInfo: FC<SystemInfoProps> = ({ children }) => {
  const rightMenuItems: MenuProps['items'] = [
    {
      label:<Link to="/">首页</Link>,
      key: '1',
    },
    {
      label: '演奏',
      key: '2',
      children:[
        {
          label:'基本乐理知识', 
          key:'10',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        {
          label:'演奏规范与技巧',
          key:'11',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        {
          label:<Link to="/opern">曲谱</Link>,
          key:'12',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
      ],
    },
    {
      label: '口琴',
      key: '3',
       children:[
        {
          label:'口琴介绍',
          key:'8',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        {
          label:'名家介绍',
          key:'9',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        
      ],
    },
    {
      label: '星一',
      key: 'xingyi',
      children:[
        {
          label:'社团历史',
          key:'4',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        {
          label:'主要成员',
          key:'5',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        {
          label:'社团介绍',
          key:'6',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        {
          label:'加入我们',
          key:'7',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
      ],
     
    },
  ];

    return (
    <Flex vertical className="systeminfo-container">
      <Flex 
        justify="space-between" 
        align="center"
        style={{
          backgroundColor: '#fff',
          padding: '0 24px',
          borderBottom: '1.5px solid #f0f0f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo Section */}
        <div className='systeminfo-logo'>
          <img src={new URL('../../assets/img/logo.jpg', import.meta.url).href} alt="Logo"
          style={
            {
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              margin: '10px 0',
              border: '2px solid #0d599bff',
            }
          }></img>
        </div>

        {/* Menu Section */}
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={rightMenuItems}
          popupClassName="custom-submenu"  // 添加统一className
          style={{
            borderBottom: 'none',
            lineHeight: '64px',
            minWidth: '300px',
            fontSize: '18px',
          }}
        />
      </Flex>
      
      {children}
    </Flex>
  );
};

export default SystemInfo;