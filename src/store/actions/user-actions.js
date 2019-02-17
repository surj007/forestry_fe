import { message } from 'antd';

import { SET_USER, DEL_USER } from '../action-types';

export function setUser(data) {
  return {
    type: SET_USER,
    data
  };
}

export function delUser() {
  return {
    type: DEL_USER
  };
}

export function login(data, callback) {
  return (dispatch, getState) => {
    window.$http({
      url: '/admin/auth/login',
      method: 'POST',
      data
    }).then((res) => {
      if(res.data.code == 0) {
        dispatch(setUser(res.data.data));
        callback && callback();
      }
      else {
        message.error(res.data.message);
      }
    }).catch((e) => {
      console.warn(e);
      message.error('网络错误，请重试');
    });
  }
}

export function logout(callback) {
  return (dispatch, getState) => {
    window.$http({
      url: '/admin/auth/logout',
      method: 'GET'
    }).then((res) => {
      if(res.data.code == 0) {
        window.sessionStorage.removeItem('login');
        dispatch(delUser());
        callback && callback();
      }
      else {
        message.error(res.data.message);
      }
    }).catch((e) => {
      console.warn(e);
      message.error('网络错误，请重试');
    });
  }
}

export function getUserBySession(callback) {
  return (dispatch, getState) => {
    window.$http({
      url: '/admin/auth/getUserBySession',
      method: 'GET'
    }).then((res) => {
      if(res.data.code == 0) {
        dispatch(setUser(res.data.data));
        callback && callback(true);
      }
      else {
        message.error(res.data.message);
        callback && callback(false);
      }
    }).catch((e) => {
      console.warn(e);
      message.error('网络错误，请重试');
    });
  }
}