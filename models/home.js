const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 获取Banner轮播数据
 */
function getBanners() {
  return check.checkResult(util.request(config.Banner));
}

/**
 * 获取宣传数据
 */
function getPublicity() {
  return check.checkResult(util.request(config.index));
}

module.exports = {
  getBanners: getBanners,
  getPublicity: getPublicity,
}