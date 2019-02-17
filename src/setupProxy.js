const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    proxy('/admin', {
      target: 'http://localhost',
      changeOrigin: true,
      pathRewrite: {'^/admin': ''}
    })
  );
};