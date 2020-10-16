// pages/timeLines/timeLines.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: [],
    status: 0,
    array: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      let times = JSON.parse(options.timeLines)
      let name = options.name
      let picUrl = options.picUrl
      let status = times[0].status

      this.setData({
        times: times,
        name: name,
        picUrl: picUrl,
        status: status,
      })

      if (status <= 3) {
        this.setData({
          array: [
            { desc: '待执行', status: 0, },
            { desc: '待质检', status: 1, },
            { desc: '已质检', status: 2, },
            { desc: '已完成', status: 3, },
          ]
        })
      } else {
        this.setData({
          array: times.reverse(),
        })
      }
    }
  },

})