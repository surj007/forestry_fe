import axios from 'axios';
import { message, Modal } from 'antd';

const request = axios.create({
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache'
  }
});

request.interceptors.response.use((res) => {
  if(res.data.code && res.data.code == 4) {
    Modal.warning({
      title: '提示',
      content: '已超时，请重新登陆',
      onOk() {
        window.$session.del('user');
        window.$session.del('menu');
        window.location.reload();
      }
    });
  }
  else if(res.status != 200) {
    console.warn(res.config.url, 'http not 200');
    message.error('网络错误，请重试');
  }
  else if(res.data.code && res.data.code != 0) {
    console.warn(res.config.url, res.data.message);
    message.error(res.data.message);
  }
  return res;
}, (e) => {
  console.warn('http status err: ', e);
  message.error('网络错误，请重试');
});

export default request;