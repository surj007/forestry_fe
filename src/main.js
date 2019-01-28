import Vue from 'vue';
import axios from 'axios'
import ElementUI from 'element-ui';

import App from './App';
import router from './router';
import store from './store';

import './styles/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.headers.get['Cache-Control'] = 'no-cache';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

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
