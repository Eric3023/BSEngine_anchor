const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 获取分享链接
 */
function getShareUrl() {
  return check.checkResult(util.request(config.shareUrl));
}

/**
 * 邀请记录
 */
function inviteFriend() {
  return check.checkResult(util.request(config.inviteFriend));
}

module.exports = {
  getShareUrl: getShareUrl,
  inviteFriend:inviteFriend,
}