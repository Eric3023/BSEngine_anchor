const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 查询银行卡
 */
function listBank() {
  return check.checkResult(util.request(config.listBank));
}

/**
 * 绑定银行卡
 */
function addBank({ cardholder, bankName, bankCardNo }) {
  return check.checkResult(util.request(config.addBank, {
    cardholder: cardholder,
    bankName: bankName,
    bankCardNo: bankCardNo
  }, 'POST'));
}

/**
 * 解绑银行卡
 */
function delBank({ id }) {
  return check.checkResult(util.request(config.delBank, {
    id: id,
  }, 'POST'));
}

module.exports = {
  addBank: addBank,
  listBank: listBank,
  delBank: delBank,
}