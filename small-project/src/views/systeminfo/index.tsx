import type { FC } from 'react';
import './index.less';
import { Flex, Menu } from 'antd';
import type { MenuProps } from 'antd';
import{Link,useLocation} from 'react-router-dom';

type SystemInfoProps = {
  children?: React.ReactNode;  // Made children optional and used full namespace
};

const SystemInfo: FC<SystemInfoProps> = ({ children }) => {
  const location = useLocation();
  const currentPath=location.pathname;

  const getSelectedKey = () => {
    switch (currentPath){
      case '/technology':
        return '2';
      case '/opern':
        return '2';
      case '/':
        return '1';
      default:
        return '1';
    }
  };
  
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
          label:<Link to="/technology">星一口琴宝典</Link>, 
          key:'10',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
        {
          label:<Link to="/opern">曲谱库</Link>,
          key:'11',
          style:{
            fontFamily: '思源雅黑' 
          }
        },
      ],
    },
    {
      label: '社区',
      key: '3',
    },
    {
      label: '主页',
      key: '4',   
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
          selectedKeys={[getSelectedKey()]}
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