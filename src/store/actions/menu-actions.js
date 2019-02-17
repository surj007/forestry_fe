import { message } from 'antd';

import { SET_MENU, DEL_MENU } from '../action-types';

export function setMenu(data) {
  return {
    type: SET_MENU,
    data
  };
}

export function delMenu() {
  return {
    type: DEL_MENU
  };
}

export function getMenu(callback) {
  return (dispatch, getState) => {
    window.$http({
      url: '/admin/menu/getMenu',
      method: 'GET'
    }).then((res) => {
      if(res.data.code == 0) {
        dispatch(setMenu(res.data.data));
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