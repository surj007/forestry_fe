import { ADD_USER, DEL_USER } from '../action-types';
import { message } from 'antd';

export function addUser(data) {
  return {
    type: ADD_USER,
    data
  };
}

export function delUser(data) {
  return {
    type: DEL_USER,
    data
  };
}

export function login(data, callback) {
  return (dispatch, getState) => {
    window.axios({
      url: '/auth/login',
      method: 'POST',
      data
    }).then((res) => {
      if(res.data.code == 0) {
        dispatch(addUser(res.data.data));
        callback && callback();
      }
      else {
        message.error(res.data.message);
      }
    }).catch((e) => {
      console.log(e);
      message.error('登陆错误，请重试');
    });
  }
}