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
  onAdd: function(){
    wx.navigateTo({
      url: '/pages/addBank/addBank',
    })
  },
})