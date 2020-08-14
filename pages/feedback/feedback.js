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
    console.log(content);

  },

  handleContact: function (event) {
    console.log(event)
  }
})