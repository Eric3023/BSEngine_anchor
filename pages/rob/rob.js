const activityModel = require("../../models/activity.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    data: {},
    hasRob: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = parseInt(options.id)
    this._getData()
  },

  /**
   * 点击了抢单
   */
  onRob: function (event) {
    activityModel.robActivity({ id: this.data.id }).then(res => {
      wx.showModal({
        content: '抢单成功！\n请在订单里查看执行',
        cancelText: '返回',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }).catch(exp => {
      wx.showModal({
        content: exp.errmsg,
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    })
  },

  /**
   * 获取数据
   */
  _getData: function () {
    activityModel.getActivityDetail({ id: this.data.id }).then(res => {
      this.setData({
        data: res.data,
      })
    }).catch(exp => {

    })
  }
})