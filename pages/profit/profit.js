const date = new Date();
const year = date.getFullYear()
const month = date.getMonth()
const profitModel = require('../../models/profit.js')

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
    index: [2, month - 1],
    year: year,
    month: month,

    max: 0,

    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getProfit()
  },

  /**
   * 选中日期变化
   */
  onMonthChanged: function (event) {
    let index = event.detail.value
    this.setData({
      year: this.data.date[0][index[0]],
      month: this.data.date[1][index[1]],
    })
    this._getProfit()
  },

  /**
   * 获取当前日期最大收益
   */
  _initMax: function () {
    for (var i = 0; i < this.data.data.profitMonthEveryDay.length; i++) {
      let item = this.data.data.profitMonthEveryDay[i]
      if (item.profit > this.data.max) {
        this.data.max = item.profit
      }
    }

    this.setData({
      max: this.data.max
    })
  },

  /**
   * 获取收益数据
   */
  _getProfit: function () {
    let month = this.data.month > 9 ? this.data.year + '-' + this.data.month : this.data.year + '-0' + this.data.month
    profitModel.getProfit(month).then(res => {
      this.setData({
        data: res.data
      })
      this._initMax()
    }).catch(exp => {

    })
  },
})