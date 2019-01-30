import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oUserInfo: {},
    aMenu: []
  },
  mutations: {
    setUserInfo(state, data) {
      state.oUserInfo = data;
    },
    setMenu(state, data) {
      state.aMenu = data;
    },
  },
  actions: {
    login(context, {oLoginInfo, oVm}) {
      return new Promise((resolve, reject) => {
        oVm.$http({
          url: '/auth/login',
          method: 'POST',
          data: {
            username: oLoginInfo.sUsername,
            password: oLoginInfo.sPassword
          }
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setUserInfo', res.data.data);
            resolve();
          }
          else {
            oVm.$message({
              message: res.data.message,
              type: 'error'
            });
            reject();
          }
        }, () => {
          oVm.$message({
            message: 'login status错误: ' + res.status,
            type: 'error'
          });
          reject();
        });
      });
    },
    getMenu(context, oVm) {
      return new Promise((resolve, reject) => {
        oVm.$http({
          url: '/auth/getMenu',
          method: 'GET'
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setMenu', res.data.data);
            resolve();
          }
          else {
            oVm.$message({
              message: 'getMenu code错误: ' + res.data.message,
              type: 'error'
            });
            reject();
          }
        }, () => {
          oVm.$message({
            message: 'getMenu status错误: ' + res.status,
            type: 'error'
          });
          reject();
        });
      });
    },
    logout(context, oVm) {
      return new Promise((resolve, reject) => {
        oVm.$http({
          url: '/auth/logout',
          method: 'GET'
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setUserInfo', {});
            context.commit('setMenu', []);
            oVm.$cookie.remove('connect.sid');
            oVm.$message({
              message: res.data.message,
              type: 'success'
            });
            resolve();
          }
          else {
            oVm.$message({
              message: 'logout code错误: ' + res.data.message,
              type: 'error'
            });
            reject();
          }
        }, () => {
          oVm.$message({
            message: 'logout status错误: ' + res.status,
            type: 'error'
          });
          reject();
        });
      });
    }
  }
});
