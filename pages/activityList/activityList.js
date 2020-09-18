const orderModel = require('../../models/order.js')

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
   * 取消
   */
  onCancel: function (e) {
    if (this.data.type == 1 || this.data.type == 2) {
      let order = e.currentTarget.dataset.item
      this._cancelOrder(order.id)
    }
  },

  /**
   * 执行
   */
  onExecue: function (e) {
    let order = e.currentTarget.dataset.item
    switch (this.data.type) {
      case 1:
        this._exeOrder(order.id)
        break
      case 2:
        this._qualityOrder(order.id)
        wx.navigateTo({
          url: `/pages/liveData/liveData?id=${order.id}`,
        })
        break
    }
  },

  /**
   * 删除事件
   */
  del: function (e) {
    if (this.type == 3 || this.type == 4) return
    let order = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    this._delOrder(order.id, index)
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
    if (this.data.type == 3 || this.data.type == 4) return
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
    orderModel.getLiveOrders({
      status: this.data.type - 1,
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

  /**
   * 取消订单
   */
  _cancelOrder: function (id) {
    orderModel.cancelOrder({ id: id }).then(res => {
      wx.showToast({
        title: '取消成功',
        icon: 'none'
      })

      //刷新页面
      this._getOrders()

    }).catch(exp => {
      wx.showToast({
        title: '取消失败',
        icon: 'none'
      })
    })
  },

  /**
   * 删除订单
   */
  _delOrder: function (id, index) {
    orderModel.delOrder({ id: id }).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'none'
      })

      //更新界面
      this.data.items.splice(index, 1)
      this.setData({
        items: this.data.items
      })
    }).catch(exp => {
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      })
    })
  },

  /**
   * 执行订单
   */
  _exeOrder: function (id, index) {
    orderModel.exeOrder({ id: id }).then(res => {
      wx.showToast({
        title: '已提交执行',
        icon: 'none'
      })

      //刷新页面
      this._getOrders()
    }).catch(exp => {
      wx.showToast({
        title: '执行质检失败',
        icon: 'none'
      })
    })
  },
})