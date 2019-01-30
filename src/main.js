import Vue from 'vue';
import axios from 'axios'
import ElementUI from 'element-ui';
import Cookie from 'js-cookie';
import Icon from 'vue-svg-icon/Icon.vue'

import App from './App';
import router from './router';
import store from './store';

import './styles/normalize.css';
import './styles/style.less';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  //baseURL: 'http://localhost',
  //timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache'
  },
  //withCredentials: true
});
Vue.prototype.$cookie = Cookie;

Vue.use(ElementUI);

Vue.component('icon', Icon);

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
