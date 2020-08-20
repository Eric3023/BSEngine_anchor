Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 点击了抢单
   */
  onRob: function(event){
    wx.showModal({
      content: '抢单成功！\n请在订单里查看执行',
      cancelText: '返回',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
  },
})