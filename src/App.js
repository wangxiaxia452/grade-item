import React from 'react';
import { ConfigProvider } from 'antd';
import MyApp from './MyApp'

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'orange',
      },
    }}
  >
    <MyApp />
  </ConfigProvider>
);