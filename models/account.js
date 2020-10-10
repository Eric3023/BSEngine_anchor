const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 提现
 * type:0微信提现；1银行卡提现
 */
function withdraw({ amount, bankId, type = 1 }) {
  return check.checkResult(util.request(config.withdraw, {
    amount: amount,
    bankId: bankId,
    type: type
  }, 'POST'));
}

/**
 * 提现记录
 */
function withdrawRecord({ page = 1, size = 10 }) {
  return check.checkResult(util.request(config.withdrawRecord, {
    page: page,
    size: size,
  }));
}

module.exports = {
  withdraw: withdraw,
  withdrawRecord: withdrawRecord,
}