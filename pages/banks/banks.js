// pages/banks/banks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 添加银行卡
   */
  onAdd: function () {
    wx.navigateTo({
      url: '/pages/addBank/addBank',
    })
  },

  /**
   * 删除银行卡
   */
  onClickItem: function (event) {
    wx.showModal({
      content: '解绑银行卡',
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})