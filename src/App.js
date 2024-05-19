
import { Layout, theme } from 'antd';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import Header from './components/Header'
import LeftNav from './components/LeftNav';
import routes from './routes';
import './App.less'
const { Content } = Layout;



const App = () => {
  const element = useRoutes(routes)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{height: '100vh'}}>
      <Header />
      <Layout>
        <LeftNav/>
        <Layout
          // style={{
            // padding: '0 24px 24px',
          // }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              padding: 12,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {element}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;