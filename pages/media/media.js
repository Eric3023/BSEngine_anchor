const mediaModel = require('../../models/media.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    page: 0,
    list: [],
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMediaList(this.data.page)
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
   * 到达页面底部加载更多
   */
  onReachBottom: function () {
    this._getMediaList()
  },

  /**
   * 添加账号
   */
  addAccount: function (event) {
    wx.navigateTo({
      url: '/pages/plateform/plateform',
    })
  },

  /**
   * 修改查看账号
   */
  onClickItem: function (event) {
    let value = JSON.stringify(event.currentTarget.data.value)
    wx.navigateTo({
      url: `/pages/addAccount/addAccount?value=${value}`,
    })
  },

  /**
   * 获取账号列表
   */
  _getMediaList: function (page) {
    if (!this.data.hasMore) return

    mediaModel.getMediaList({
      page: page
    }).then(res => {
      this.data.list = this.data.list.concat(res.data.list)
      this.setData({
        list: this.data.list
      })

      if (res.data.empty) {
        this.data.hasMore = false
      } else {
        this.data.hasMore = true
        this.data.page++
      }
    }).catch(exp => {

    })
  }
})