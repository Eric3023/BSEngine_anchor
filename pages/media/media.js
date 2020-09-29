const mediaModel = require('../../models/media.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    page: 1,
    list: [],
    hasMore: true,
    lock: false,
  },

  /**
   * 生命周期函数
   */
  onShow: function () {
    this._reset(this.data.type)
    this._getMediaList(this.data.page)
  },

  /**
   * 更改类型
   */
  onChangeType: function (event) {
    let type = event.currentTarget.dataset.type

    this._reset(type)
    this._getMediaList(this.data.page)
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
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();

    mediaModel.getMediaList({
      isLive: this.data.type,
      page: page
    }).then(res => {
      this.data.page++
      this.data.list = this.data.list.concat(res.data.list)
      let hasNext = res.data.pageData.hasNext;
      this.setData({
        list: this.data.list,
        hasMore: hasNext
      })

      this._removeLock();
      wx.hideLoading();
    }).catch(exp => {
      this._removeLock();
      wx.hideLoading();
    })
  },

  /**
 * 重置数据
 */
  _reset(type) {
    this.setData({
      type: type,
      list: [],
      page: 1,
      lock: false,
      hasMore: true,
    });
  },

  /**
   * 是否加锁（正在请求数据）
   */
  _isLock() {
    return this.data.lock;
  },

  /**
   * 加锁
   */
  _addLock() {
    this.setData({
      lock: true,
    });
  },

  /**
   * 解锁
   */
  _removeLock() {
    this.setData({
      lock: false,
    });
  },
})