const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 获取分享链接
 */
function getShareUrl() {
  return check.checkResult(util.request(config.shareUrl));
}

module.exports = {
  getShareUrl: getShareUrl,
}