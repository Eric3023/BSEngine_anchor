// pages/timeLines/timeLines.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      let times = JSON.parse(options.timeLines)
      let name = options.name
      let picUrl = options.picUrl
      this.setData({
        times: times,
        name: name,
        picUrl: picUrl,
      }) 
    }
  },

})