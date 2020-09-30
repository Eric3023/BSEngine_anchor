const date = new Date();
const year = date.getFullYear()
const mouth = date.getMonth()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //日期
    date: [
      [year - 2, year - 1, year],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    ],
    index: [2, mouth - 1],
    year: year,
    mouth: mouth,

    max: 0,

    list: [
      { data: 1, money: 100, },
      { data: 2, money: 200, },
      { data: 3, money: 150, },
      { data: 4, money: 210, },
      { data: 5, money: 300, },
      { data: 6, money: 400, },
      { data: 7, money: 120, },
      { data: 8, money: 200, },
      { data: 9, money: 120, },
      { data: 10, money: 180, },
      { data: 11, money: 300, },
      { data: 12, money: 240, },
      { data: 13, money: 500, },
      { data: 14, money: 360, },
      { data: 15, money: 150, },
      { data: 16, money: 210, },
      { data: 17, money: 140, },
      { data: 18, money: 160, },
      { data: 19, money: 200, },
      { data: 20, money: 240, },
      { data: 21, money: 360, },
      { data: 22, money: 320, },
      { data: 23, money: 330, },
      { data: 24, money: 420, },
      { data: 25, money: 180, },
      { data: 26, money: 120, },
      { data: 27, money: 320, },
      { data: 28, money: 200, },
      { data: 29, money: 160, },
      { data: 30, money: 150, },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initMax()
  },

  /**
   * 获取当前日期最大收益
   */
  _initMax: function () {
    for (var i = 0; i < this.data.list.length; i++) {
      let item = this.data.list[i]
      if (item.money > this.data.max) {
        this.data.max = item.money
      }
    }

    this.setData({
      max: this.data.max
    })
  },

})