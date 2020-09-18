const bankModel = require('../../models/bank.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getBanks()
  },

  /**
   * 添加银行卡
   */
  onAdd: function () {
    wx.navigateTo({
      url: '/pages/addBank/addBank',
    })
  },

  /**
   * 删除银行卡
   */
  onClickItem: function (event) {
    let id = event.currentTarget.dataset.item.id
    let index = event.currentTarget.dataset.item.index
    wx.showModal({
      content: '解绑银行卡',
      cancelText: '否',
      confirmText: '是',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
          this._delBank(id, index)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 获取银行卡列表
   */
  _getBanks() {
    bankModel.listBank().then(res => {
      this.setData({
        list: res.data
      })
    }).catch(exp => {

    })
  },

  /**
   * 解绑银行卡
   */
  _delBank: function (id, index) {
    bankModel.delBank({ id: id }).then(res => {
      wx.showToast({
        title: '银行卡解绑成功',
        icon: 'none',
      })
      //刷新页面
      this.data.list.splice(index, 1)
      this.setData({
        list: this.data.list
      })
    }).catch(exp => {
      wx.showToast({
        title: '银行卡解绑失败',
        icon: 'none',
      })
    })
  }
})