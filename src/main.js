import Vue from 'vue';
import axios from 'axios'
import ElementUI from 'element-ui';

import App from './App';
import router from './router';
import store from './store';

import './styles/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache'
  }
});

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data() {
    return {
      bus: new Vue()
    }
  }
});
