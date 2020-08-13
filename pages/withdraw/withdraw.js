// pages/withdraw/withdraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    banks: [
      {
        icon: '/img/icon/icon_header.png',
        name: '农业储蓄卡(3478)'
      },
      {
        icon: '/img/icon/icon_header.png',
        name: '建设储蓄卡(9876)'
      },
      {
        icon: '/img/icon/icon_header.png',
        name: '交通储蓄卡(4538)'
      },
      {
        icon: '/img/icon/icon_header.png',
        name: '招商储蓄卡(2367)'
      },
      {
        icon: '/img/icon/icon_header.png',
        name: '北京储蓄卡(9478)'
      },
    ],
    //提现金额
    money: '',
    maxlength: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      maxlength = index + 2 + 13;
    }
    this.setData({
      maxlength,
      money
    })
  }
})