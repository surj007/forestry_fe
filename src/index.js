import React from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'js-cookie';
import QueryString from 'querystring';
import PubSub from 'pubsub-js';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import { AppContainer } from 'react-hot-loader';
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
window.$cookie = Cookie;
window.$service = service;
window.$session = session;
window.$querystring = QueryString;
window.$pubsub = PubSub;

ReactDOM.render(
  (
    <AppContainer>
      <Provider store={ store }>
        <LocaleProvider locale={ zh_CN }>
          <Page />
        </LocaleProvider>
      </Provider>
    </AppContainer>
  ),
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(
      (
        <AppContainer>
          <Provider store={ store }>
            <LocaleProvider locale={ zh_CN }>
              <Page />
            </LocaleProvider>
          </Provider>
        </AppContainer>
      ),
      document.getElementById('root')
    );
  });
}

serviceWorker.unregister();