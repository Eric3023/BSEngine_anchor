var util = require('../utils/util.js');
var config = require('../config/api.js');
const check = require('../models/check.js');

/**
 * 获取订单
 */
function getLiveOrders({ status, page = 1, size = 10 }) {
  return check.checkResult(util.request(config.liveOrders, { status: status, page: page, size: size }));
}

/**
 * 取消订单
 */
function cancelOrder({ id }) {
  return check.checkResult(util.request(config.cancelOrder, { orderId: id }, 'POST'));
}

/**
 * 删除订单
 */
function delOrder({ id }) {
  return check.checkResult(util.request(config.delOrder, { orderId: id }, 'POST'));
}

/**
 * 质检订单
 */
function qualityOrder({ id }) {
  return check.checkResult(util.request(config.qualityOrder, { orderId: id }, 'POST'));
}

module.exports = {
  getLiveOrders: getLiveOrders,
  cancelOrder: cancelOrder,
  delOrder: delOrder,
  qualityOrder: qualityOrder,
};