const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 获取每月收益数据
 */
function getProfit(month) {
  return check.checkResult(util.request(config.profit, { month: month }));
}

module.exports = {
  getProfit: getProfit,
}