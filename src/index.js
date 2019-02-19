import React from 'react';
import ReactDOM from 'react-dom';

import cookie from 'js-cookie';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Page from './Page';
import store from './store';
import service from './service';
import session from './config/sessionStorage';
import request from './config/request';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './styles/style.css';

moment.locale('zh-cn');

window.$http = request;
window.$cookie = cookie;
window.$service = service;
window.$session = session;

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

serviceWorker.unregister();