let activityModel = require('../../models/activity.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],

    status: 0,

    page: 1,
    size: 20,
    lock: false,
    hasMore: true,

    touchStartTime: 0,
    touchEndTime: 0,

    types: [
      {
        id: 0x1001,
        icon: '/img/activity/icon_wait_receive.png'
      },
      {
        id: 0x1002,
        icon: '/img/activity/icon_wait_action.png'
      },
      {
        id: 0x1003,
        icon: '/img/activity/icon_wait_exam.png'
      },
      {
        id: 0x1004,
        icon: '/img/activity/icon_wait_tested.png'
      },
      {
        id: 0x1005,
        icon: '/img/activity/icon_completed.png'
      },
      {
        id: 0x1006,
        icon: '/img/activity/icon_refused.png'
      },
      {
        id: 0x1007,
        icon: '/img/activity/icon_stopped.png'
      },
      {
        id: 0x1001,
        icon: '/img/activity/icon_cancel.png'
      },
    ],

    leftData: [],
    rightData: [],
    leftHeight: 0,
    rightHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getActivities();
  },

  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
    this._reset();
    this._getActivities();
  },

  /**
   * 滑动到页面底部
   */
  onReachBottom: function () {
    this._getActivities();
  },

  /**
   * 按钮触摸开始触发的事件
   */
  onTouchStart: function (e) {
    this.data.touchStartTime = e.timeStamp;
  },

  /**
   * 按钮触摸结束触发的事件
   */
  onTouchEnd: function (e) {
    this.data.touchEndTime = e.timeStamp;
  },

  /**
   * 修改列表中的订单状态
   */
  onChangeType: function (event) {
    let index = event.currentTarget.dataset.index;
    // this._reset(index);
    switch (index) {
      //待接单
      case 0:
        wx.navigateTo({
          url: `/pages/activities/index`,
        })
        return
      //待执行
      case 1:
        break
      //待质检
      case 2:
        break
      //已质检
      case 3:
        break
      //已完成
      case 4:
        break
      //已拒单
      case 5:
        break
      //已叫停
      case 6:
        break
      //已取消
      case 7:
        break
    }
    wx.navigateTo({
      url: `/pages/activityList/activityList?type=${index}`,
    })
  },

  /**
   * 点击订单列表，进入订单详情
   */
  onClickItem(event) {
    if (this.data.touchEndTime - this.data.touchStartTime > 350) return;
    let item = event.currentTarget.dataset.value;
    let id = item.id;
    let status = item.status;
    console.log(event);
    wx.navigateTo({
      url: `/pages/rob/rob?id=${id}`,
    })
  },

  /**
   * 重置数据
   */
  _reset(status) {
    this.setData({
      status,
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
   * 获取我的订单列表
   */
  _getActivities() {
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();
    activityModel.getActivityList({
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