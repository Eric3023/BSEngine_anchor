var util = require('../utils/util.js');
var config = require('../config/api.js');
const check = require('../models/check.js');

/**
 * 获取订单
 */
function getLiveOrders({ status, page = 1, size = 10 }) {
  if (status != undefined)
    return check.checkResult(util.request(config.liveOrders, { status: status, page: page, size: size }));
  else
    return check.checkResult(util.request(config.liveOrders, { page: page, size: size }));
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
 * 执行订单
 */
function exeOrder({ id, url, code, imgs }) {
  return check.checkResult(util.request(config.exeOrder, {
    "orderId": id,
  }, 'POST'));
}

/**
 * 质检订单
 */
function qualityOrder({ id, url, code, imgs }) {
  return check.checkResult(util.request(config.qualityOrder, {
    "cloudUrl": url,
    "extractionCode": code,
    "orderId": id,
    "screenshot": imgs
  }, 'POST'));
}

/**
 * 获取订单质检信息
 */
function qualityAssessment({ id }) {
  return check.checkResult(util.request(config.qualityAssessment, {
    "orderId": id,
  }));
}

/**
 * 获取订单详情
 */
function getOrderDetail({ id }) {
  return check.checkResult(util.request(config.orderDetail, {
    "orderId": id,
  }));
}

module.exports = {
  getLiveOrders: getLiveOrders,
  cancelOrder: cancelOrder,
  delOrder: delOrder,
  exeOrder: exeOrder,
  qualityOrder: qualityOrder,
  qualityAssessment: qualityAssessment,
  getOrderDetail: getOrderDetail,
};