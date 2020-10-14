const imageModel = require('../../models/file.js');
const orderModel = require('../../models/order.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //订单id
    id: -1,
    //上传截图
    imgs: [],
    //云盘地址
    pan: '',
    //云盘提取码
    code: '',

    touchStartTime: 0,
    touchEndTime: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    let isUpload = options.isUpload
    if (isUpload == 1) {
      this._getQualityInfo()
    }
  },

  /**
   * 按钮触摸开始触发的事件
   */
  onTouchStart: function (e) {
    this.data.touchStartTime = e.timeStamp;
  },

  /**
   * 按钮触摸结束触发的事件
   */
  onTouchEnd: function (e) {
    this.data.touchEndTime = e.timeStamp;
  },

  /**
   * 提交数据
   */
  onSubmit: function (e) {
    this, this._qualityOrder();
  },

  /**
   * 上传数据截图
   */
  onUpdate: function (event) {
    this._chooseImage()
      .then(res => {
        return this._updateImage(res);
      })
      .then(res => {
        console.log(res)
        this.data.imgs.push(res.data.url)
        this.setData({
          imgs: this.data.imgs
        });
        console.log(this.data.imgs);
      }, error => {
        console.log(`上传失败：${error}`);
      });
  },

  /**
   * 预览数据截图
   */
  onPreview: function (event) {
    if (this.data.touchEndTime - this.data.touchStartTime > 350) return;
    let url = event.currentTarget.dataset.src
    wx.previewImage({
      urls: [url],
    })
  },

  /**
   * 删除数据截图
   */
  onDelete: function (event) {
    let index = event.currentTarget.dataset.index
    wx.showModal({
      content: '确认删除图片？',
      success: res => {
        this.data.imgs.splice(index, 1)
        this.setData({
          imgs: this.data.imgs
        })
      }
    })
  },

  /**
   * 选择照片
   */
  _chooseImage: function () {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['origin'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          let path = res.tempFiles[0].path;
          resolve(path)
        },
        fail: e => {
          reject(e);
        }
      })
    });
  },

  /**
   * 上传照片
   */
  _updateImage(path) {
    return imageModel.uploadImage({
      path: path,
      progress: res => {
        console.log('上传进度', res.progress);
      }
    });
  },

  /**
   * 提交质检
   */
  _qualityOrder() {

    let screenshot = ''
    for (var i = 0; i < this.data.imgs.length; i++) {
      screenshot += this.data.imgs[i]
      if (i != this.data.imgs.length - 1)
        screenshot += ','
    }

    orderModel.qualityOrder({
      id: this.data.id,
      url: this.data.pan,
      code: this.data.code,
      imgs: screenshot
    }).then(res => {
      wx.showToast({
        title: '提交成功',
        icon: 'none'
      })

      setTimeout(_ => wx.navigateBack(1), 1000)
    }).catch(exp => {
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      })
    })
  },

  /**
   * 已提交的质检信息
   */
  _getQualityInfo: function () {
    orderModel.qualityAssessment({ id: this.data.id }).then(res => {
      let screenshot = res.data.screenshot
      let imgs = []
      if (screenshot) {
        imgs = screenshot.split(',')
      }

      this.setData({
        pan: res.data.cloudUrl,
        code: res.data.extractionCode,
        imgs: imgs,
      })
    }).catch(exp => {

    })
  },

})