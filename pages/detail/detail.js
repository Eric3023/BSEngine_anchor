const orderModel = require('../../models/order.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this._getDetail(id)
  },

  /**
   * 点击进入时间轴
   */
  onTimeLines: function (e) {
    if (this.data.data && this.data.data.timeLines && this.data.data.timeLines.length > 0) {
      let timeLines = JSON.stringify(this.data.data.timeLines)
      wx.navigateTo({
        url: `/pages/timeLines/timeLines?timeLines=${timeLines}&picUrl=${this.data.data.picUrl}&name=${this.data.data.name}`,
      })
    }
  },

  /**
   * 获取订单详情
   */
  _getDetail: function (id) {
    orderModel.getOrderDetail({ id: id }).then(res => {
      this.setData({
        data: res.data
      })
    }).catch(exp => {

    })
  },

})