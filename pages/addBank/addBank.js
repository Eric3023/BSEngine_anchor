const bankModel = require('../../models/bank.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardholder: '',
    bankName: '',
    bankCardNo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 提交表单
   */
  onSubmit: function (event) {
    this._bindBankCard()
  },

  /**
   * 卡号自动添加空格
   */
  onNoChanged: function (e) {
    var no = e.detail.value
    var bankCardNo = no.replace(/(\d{4})(?=\d)/g, "$1 ")
    this.setData({
      bankCardNo: bankCardNo
    })
  },

  /**
   * 绑定银行卡
   */
  _bindBankCard() {
    let no = this.data.bankCardNo.replace(/\s|\xA0/g, "")
    bankModel.addBank({
      cardholder: this.data.cardholder,
      bankName: this.data.bankName,
      bankCardNo: no,
    }).then(res => {
      wx.showToast({
        title: '银行卡绑定成功',
        icon: 'none',
      })
      setTimeout(_ => wx.navigateBack(1), 1000)
    }).catch(exp => {
      wx.showToast({
        title: '银行卡绑定失败，请检查相关信息',
        icon: 'none',
      })
    })
  }
})