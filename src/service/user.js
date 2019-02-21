import { message } from 'antd';

export function login(data) {
  return new Promise((resolve) => {
    window.$http({
      url: '/admin/auth/login',
      method: 'POST',
      data
    }).then((res) => {
      if(res && res.data.code == 0) {
        window.$session.set('user', res.data.data);
        resolve();
      }
    });
  });
}

export function logout() {
  return new Promise((resolve) => {
    window.$http({
      url: '/admin/auth/logout',
      method: 'GET'
    }).then((res) => {
      if(res && res.data.code == 0) {
        window.$session.del('user');
        window.$session.del('menu');
        message.success('退出成功');
        resolve();
      }
    });
  });
}