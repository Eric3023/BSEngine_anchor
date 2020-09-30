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
   * 转发
   */
  onShareAppMessage: function (res) {
    let inviter = wx.getStorageSync('phone')
    return {
      title: "最近发现一个收米小程序",
      path: `/pages/index/index?inviter=${inviter}`
    }
  },
})