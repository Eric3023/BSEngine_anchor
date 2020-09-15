const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 获取活动列表
 */
function getActivityList({ name = '', status = 0, page = 0, size = 10 }) {
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
function likeActivity({id}){

}


module.exports = {
  getActivityList: getActivityList,
  getActivityDetail: getActivityDetail,
  robActivity: robActivity,
}