// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 更改类型
   */
  onChangeType: function (event) {
    this.setData({
      type: event.currentTarget.dataset.type
    })
    console.log(`type:${this.data.type}`);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 添加账号
   */
  addAccount: function (event) {
    wx.navigateTo({
      url: '/pages/addAccount/addAccount',
    })
  },

  /**
   * 修改查看账号
   */
  onClickItem: function (event) {
    wx.navigateTo({
      url: '/pages/addAccount/addAccount',
    })
  }
})