const activityModel = require("../../models/activity.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    data: {},
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
      this.data.isReceiving == 1
      this.setData({
        data: this.data.data
      })
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
   * 点击了收藏
   */
  onCollection: function (event) {
    //已收藏
    if (this.data.data.isLiving == 1) {
      activityModel.cancelLikeActivity({ id: this.data.data.id }).then(res => {
        wx.showToast({
          title: '取消收藏成功',
          icon: 'none',
        })

        this.data.data.isLiving = 0
        this.setData({
          data: this.data.data
        })
      }).catch(exp => {
        wx.showToast({
          title: '取消收藏失败',
          icon: 'none',
        })

        this.data.data.isLiving = 1
        this.setData({
          data: this.data.data
        })
      })
    }
    //未收藏
    else if (this.data.data.isLiving == 0) {
      activityModel.likeActivity({ id: this.data.data.id }).then(res => {
        wx.showToast({
          title: '收藏成功',
          icon: 'none',
        })

        this.data.data.isLiving = 1
        this.setData({
          data: this.data.data
        })
      }).catch(exp => {
        wx.showToast({
          title: '收藏失败',
          icon: 'none',
        })

        this.data.data.isLiving = 0
        this.setData({
          data: this.data.data
        })
      })
    }
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