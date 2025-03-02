import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import zh_CN from 'antd/es/locale/zh_CN';
import store from './redux/store'
import './index.less';

if(localStorage.getItem('save')) {
  //触发一个action
  store.dispatch({
    type: 'SETUSER',
    user: JSON.parse(localStorage.getItem('save'))
  })
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#f9970e',
      },
    }}
    locale={zh_CN}
    
  >
    <Provider store={store}>
      <Router >
        <App />
      </Router>
    </Provider>

    
  </ConfigProvider>
);

