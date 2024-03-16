const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://94.130.9.202:5050',
      changeOrigin: true,
    })
  );
};
