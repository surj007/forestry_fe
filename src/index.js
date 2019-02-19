import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Page from './Page';
import store from './store';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './styles/style.css';

window.$http = axios.create({
  headers: {
    'Cache-Control': 'no-cache'
  }
});;
window.$cookie = cookie;

window.$http.interceptors.response.use((res) => {
  if(res.data.code == 4) {
    window.sessionStorage.removeItem('login');
    window.location.href = '/#/login';
  }
  return res;
});

moment.locale('zh-cn');

ReactDOM.render(
  (
    <Provider store={ store }>
      <LocaleProvider locale={ zh_CN }>
        <Page />
      </LocaleProvider>
    </Provider>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
