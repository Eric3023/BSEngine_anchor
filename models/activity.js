const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 获取活动列表
 */
function getActivityList({ name = '', status = 0, page = 0, size = 10 }) {
  return check.checkResult(util.request(config.activityList, { page: page, size: size }));
}

module.exports = {
  getActivityList: getActivityList,
}