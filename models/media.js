const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 获取账号列表
 */
function getMediaList({ page, size = 10 }) {
  return check.checkResult(util.request(config.mediaList, { page: page, size: size }));
}

/**
 * 获取平台类型
 */
function getMediaTypes() {
  return check.checkResult(util.request(config.mediaType));
}

/**
 * 获取账号类型
 */
function getLiveTypes() {
  return check.checkResult(util.request(config.liveType));
}

/**
 * 获取账号数据
 */
function getMsgForUrl(url) {
  return check.checkResult(util.request(config.mediaMsg, { url: url }));
}

/**
 * 获取报价类型
 */
function getPriceType() {
  return check.checkResult(util.request(config.priceType));
}

/**
 * 添加主播账号
 */
function addAccount({ indexUrl, liveType, mediaAccountMsg, mediaType, prices }) {
  return check.checkResult(
    util.request(config.addAcount,
      {
        "indexUrl": indexUrl,
        "liveType": liveType,
        "mediaAccountMsg": mediaAccountMsg,
        "mediaType": mediaType,
        "prices": prices
      },
      'POST')
  );
}

module.exports = {
  getMsgForUrl: getMsgForUrl,
  getPriceType: getPriceType,
  addAccount: addAccount,
  getMediaTypes: getMediaTypes,
  getLiveTypes: getLiveTypes,
  getMediaList: getMediaList,
}