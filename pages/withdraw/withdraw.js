const bankModel = require('../../models/bank.js')
const accountModel = require('../../models/account.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    totalAmount: 0,
    selectIndex: 0,
    banks: [],
    //提现金额
    money: '',
    maxlength: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let totalAmount = parseFloat(options.totalAmount)
    if (totalAmount) {
      this.setData({
        totalAmount: totalAmount,
      })
    }

    this._getBanks()
  },

  /**
   * 选择的银行卡发生改变
   */
  bindPickerChange: function (event) {
    this.setData({
      selectIndex: parseInt(event.detail.value)
    });
  },

  /**
   * 输入内容
   */
  bindinput: function (event) {
    let money = this.data.money
    let maxlength = -1
    let index = money.lastIndexOf('.')
    if (index != -1) {
      maxlength = index + 2 + 1;
    }
    this.setData({
      maxlength,
      money
    })
  },

  /**
   * 提现
   */
  onWithdraw: function (event) {
    let money = parseFloat(this.data.money)
    if (!money || money < 0) {
      wx.showToast({
        title: '输入金额不合法',
        icon: 'none',
      })
      return
    }

    let bank = this.data.banks[this.data.selectIndex]
    console.log(bank);

    accountModel.withdraw({ amount: money, bankId: bank.id }).then(res => {
      wx.showToast({
        title: '提现成功，请等待入账',
        icon: 'none',
      })
      setTimeout(_ => wx.navigateBack(1), 1000)
    }).catch(exp => {
      wx.showToast({
        title: '提现失败，请稍后重试',
        icon: 'none',
      })
    })
  },

  /**
   * 获取银行卡列表
   */
  _getBanks() {
    bankModel.listBank().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].name = res.data[i].bankName + '(' + res.data[i].bankCardNo + ')'
      }
      this.setData({
        banks: res.data
      })
    }).catch(exp => {

    })
  },

})