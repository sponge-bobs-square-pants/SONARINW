const path = require('path');

module.exports = {
  staticPath: path.join(__dirname, 'build'),
  publicPath: '/',
  skipThirdPartyRequests: false,
};