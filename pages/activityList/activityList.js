const activityModel = require('../../models/activity.js')

Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0,

    //0：带接单；1:待执行；2:待质检
    type: 0,

    page: 1,
    size: 20,
    lock: false,
    hasMore: true,
  },

  onLoad: function (option) {
    let type = parseInt(option.type)
    this.setData({
      type,
    })

    this._getOrders();
  },

  /**
   * 执行
   */
  onExecue: function (e) {
    if (this.data.type == 0) {
      wx.navigateTo({
        url: '/pages/liveData/liveData',
      })
    }
  },

  /**
   * 删除事件
   */
  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  },

  /**
   * Item触摸反馈
   */
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },

  /**
   * 滑动Item 
   */
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },

  /**
   * 计算滑动角度
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  /**
   * 重置数据
   */
  _reset(status) {
    this.setData({
      items: [],
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
   * 获取待接单列表
   */
  _getOrders: function () {
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();
    activityModel.getLiveOrders({
      page: this.data.page,
      size: this.data.size,
    }).then(
      res => {
        this.data.page++;
        let hasNext = res.data.pageData.hasNext;
        this.data.items = this.data.items.concat(res.data.list);
        this.setData({
          hasMore: hasNext,
          items: this.data.items,
        });
        this._removeLock();
        wx.hideLoading();
      }, error => {
        this._removeLock();
        wx.hideLoading();
      }
    );
  },
})