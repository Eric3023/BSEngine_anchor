const shareModel = require('../../models/share.js')

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
    this._getInviteFriends()
  },

  /**
   * 转发
   */
  onShareAppMessage: function (res) {
    let inviter = wx.getStorageSync('phone')
    return {
      title: "最近发现一个收米小程序",
      path: `/pages/index/index?inviter=${inviter}`
    }
  },

  /**
   * 获取邀请好友
   */
  _getInviteFriends: function(){
    shareModel.inviteFriend().then(res => {
      this.setData({
        data: res.data
      })
    }).catch(exp => {

    })
  }
})