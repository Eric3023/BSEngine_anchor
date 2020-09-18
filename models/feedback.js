const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 获取Banner轮播数据
 */
function feedback({ content }) {
  return check.checkResult(util.request(config.feedback, { opinion: content }, 'POST'));
}

module.exports = {
  feedback: feedback,
}