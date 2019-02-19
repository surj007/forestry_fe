import * as crypto from '../utils/crypto'

export default {
  get(key) {
    if(!window.sessionStorage.getItem(crypto.encrypt(key))) {
      return null;
    }
    return JSON.parse(crypto.decrypt(window.sessionStorage.getItem(crypto.encrypt(key))));
  },
  set(key, value) {
    window.sessionStorage.setItem(crypto.encrypt(key), crypto.encrypt(JSON.stringify(value)));
  },
  del(key) {
    window.sessionStorage.removeItem(crypto.encrypt(key));
  }
}