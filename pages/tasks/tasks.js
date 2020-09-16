const activityModel = require('../../models/activity.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getOrders()
  },

  /**
   * 获取订单
   */
  _getOrders: function () {
    activityModel.getLiveOrders({
      page: this.data.page,
    }).then(res => {

    }).catch(exp => {

    })
  }
})