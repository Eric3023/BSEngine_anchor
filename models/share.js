const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 修改密码
 */
function getShareUrl() {
  return check.checkResult(util.request(config.shareUrl));
}

module.exports = {
  getShareUrl: getShareUrl,
}