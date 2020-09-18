const feedbackModel = require('../../models/feedback.js')

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 提交反馈
   */
  bindsubmit: function (event) {
    let content = event.detail.value.content

    feedbackModel.feedback({
      content: content
    }).then(res => {
      wx.showToast({
        title: '反馈已提交',
        icon: 'none',
      })
    }).catch(exp => {
      wx.showToast({
        title: '反馈提交失败，请重试',
        icon: 'none',
      })
    })
  },

  /**
   * 联系客服
   */
  handleContact: function (event) {
    console.log(event)
  }
})