let orderModel = require('../../models/order.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orders: [],

    status: 0,

    page: 1,
    size: 20,
    lock: false,
    hasMore: true,

    touchStartTime: 0,
    touchEndTime: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this._getOrders();
  },

  /**
   * 滑动到页面底部
   */
  onReachBottom: function () {
    // this._getOrders();
  },


  /**
   * 获取我的订单列表
   */
  _getOrders() {
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();
    orderModel.getOrders(this.data.status, this.data.page, this.data.size).then(
      res => {
        this.data.page++;
        let hasNext = res.data.pageData.hasNext;
        this.data.orders = this.data.orders.concat(res.data.list);
        this.setData({
          hasMore: hasNext,
          orders: this.data.orders,
          extras: res.data.extras,
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
    this._reset(index);
    wx.showToast({
      title: `index：${index}`,
      icon: 'none'
    })
    // this._getOrders();
  },

  /**
   * 点击订单列表，进入订单详情
   */
  onClickItem(event) {
    if (this.data.touchEndTime - this.data.touchStartTime > 350) return;
    let value = event.currentTarget.dataset.value;
    let id = value.id;
    let status = value.status;
    console.log(event);
    if (id) {
      if (status == 0 || status == 1) {
        wx.navigateTo({
          url: `/pages/throw_detail2/throw_detail2?id=${id}`,
        })
      } else if (status == 2 || status == 3) {
        wx.navigateTo({
          url: `/pages/throw_detail/throw_detail?id=${id}`,
        })
      }
    }
  },

  /**
   * 重置数据
   */
  _reset(status) {
    this.setData({
      status,
      orders: [],
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

  /**
   * 是否还有更多数据
   */
  _hasMore() {
    return this.data.hasMore;
  },

  /**
   * 获取订单索引
   */
  _getIndexOfItem(id) {
    let index = -1;
    for (let i = 0; i < this.data.orders.length; i++) {
      if (this.data.orders[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  },

})