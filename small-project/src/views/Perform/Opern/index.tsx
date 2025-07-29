import type { FC } from 'react';
import './index.less';
import{ Flex } from 'antd';
import SystemInfo from '../../systeminfo';

const Opern: FC = () => {
  return (
    <SystemInfo>
    <Flex vertical className="opern-container">
      <div>Opern</div>
    </Flex>
    </SystemInfo>

  )
  

}
export default Opern;
