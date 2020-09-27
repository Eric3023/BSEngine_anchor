const activityModel = require('../../models/activity.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    page: 1,
    size: 20,
    lock: false,
    hasMore: true,
    list: [],

    leftData: [],
    rightData: [],
    leftHeight: 0,
    rightHeight: 0,
  },

  onShow: function(){
    this._reset()    
    this._getActivities()
  },

  onReachBottom: function () {
    this._getActivities()
  },

  onClickItem: function (event) {
    let item = event.currentTarget.dataset.value;
    let id = item.id;
    wx.navigateTo({
      url: `/pages/rob/rob?id=${id}`,
    })
  },

  /**
   * 重置数据
   */
  _reset() {
    this.setData({
      list: [],
      page: 1,
      lock: false,
      hasMore: true,

      leftData: [],
      rightData: [],
      leftHeight: 0,
      rightHeight: 0,
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

  /**
   * 是否还有更多数据
   */
  _hasMore() {
    return this.data.hasMore;
  },

  /**
   * 获取搜索结果
   */
  _getActivities() {
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();
    activityModel.getActivityLikeList({
      page: this.data.page,
      size: this.data.size,
    }).then(
      res => {
        console.log(res);

        this.data.page++;
        let hasNext = res.data.pageData.hasNext;
        this._initData(res.data.list);
        this.data.list = this.data.list.concat(res.data.list);
        this.setData({
          hasMore: hasNext,
          list: this.data.list,
        });
        this._removeLock();
        wx.hideLoading();
      }, error => {
        this._removeLock();
        wx.hideLoading();
      }
    );
  },

  /**
   * 数据分列
   */
  _initData: function (list) {
    for (var i = 0; i < list.length; i++) {
      var item = list[i]
      let resolution = item.resolution
      var dimens = [320, 320]
      if (resolution)
        dimens = resolution.split("*")
      //放在右侧
      if (this.data.leftHeight > this.data.rightHeight) {
        this.data.rightData.push(item)
        this.data.rightHeight += dimens[1] / dimens[0]
      }
      //放在左侧
      else {
        this.data.leftData.push(item)
        this.data.leftHeight += dimens[1] / dimens[0]
      }
    }

    this.setData({
      leftData: this.data.leftData,
      rightData: this.data.rightData,
    })

  },

})