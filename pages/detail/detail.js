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