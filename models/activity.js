const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 获取活动列表
 */
function getActivityList({ name = '', status = 3, page = 0, size = 10 }) {
  if (name)
    return check.checkResult(util.request(config.activityList, { status: status, name: name, page: page, size: size }));
  else
    return check.checkResult(util.request(config.activityList, { status: status, page: page, size: size }));
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
  return check.checkResult(util.request(config.activityLike, { aid: id }, 'POST'));
}

/**
 * 取消活动收藏
 */
function cancelLikeActivity({ id }) {
  return check.checkResult(util.request(config.activityDelLike, { aid: id }, 'POST'));
}

/**
 * 活动收藏列表
 */
function getActivityLikeList({ page, size }) {
  return check.checkResult(util.request(config.activityLikeList, { page: page, size: size }));
}

module.exports = {
  getActivityList: getActivityList,
  getActivityDetail: getActivityDetail,
  robActivity: robActivity,
  likeActivity: likeActivity,
  cancelLikeActivity: cancelLikeActivity,
  getActivityLikeList: getActivityLikeList,
}