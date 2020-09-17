const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 获取活动列表
 */
function getActivityList({ name = '', status = 0, page = 0, size = 10 }) {
  if (name)
    return check.checkResult(util.request(config.activityList, { name: name, page: page, size: size }));
  else
    return check.checkResult(util.request(config.activityList, { page: page, size: size }));
}

/**
 * 获取活动详情
 */
function getActivityDetail({ id }) {
  return check.checkResult(util.request(config.activityDetail, { aid: id }));
}

/**
 * 获取活动详情
 */
function robActivity({ id }) {
  return check.checkResult(util.request(config.activityRob, { aid: id }, 'POST'));
}

/**
 * 收藏活动
 */
function likeActivity({ id }) {

}

/**
 * 获取已抢订单
 */
function getLiveOrders({ status, page = 1, size = 10 }) {
  return check.checkResult(util.request(config.liveOrders, { page: page, size: size }));
}


module.exports = {
  getActivityList: getActivityList,
  getActivityDetail: getActivityDetail,
  robActivity: robActivity,
  getLiveOrders: getLiveOrders,
}