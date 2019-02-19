export function getMenu() {
  return new Promise((resolve) => {
    window.$http({
      url: '/admin/menu/getMenu',
      method: 'GET'
    }).then((res) => {
      if(res && res.data.code == 0) {
        window.$session.set('menu', res.data.data);
        resolve();
      }
    });
  });
}