const mediaModel = require('../../models/media.js');
const imageModel = require('../../models/file.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //信息是否可编辑
    diabled: false,
    //平台名称
    plateform: {
      name: '',
      icon: '',
      id: 0,
    },
    //主页链接
    url: '',

    //账号简介
    accountDesc: "",
    //账号ID
    accountId: "",
    //账号名称
    accountName: "",
    //粉丝数量
    fansNum: 0,
    //用户头像
    headImg: "",

    //报价
    prices: [],
    //账号分类
    types: [],
    //选中账号分类
    index: 0,
    //金额最大长度
    maxlength: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let icon = decodeURIComponent(options.icon)
    this.setData({
      plateform: {
        name: options.name,
        icon: icon,
        id: options.id
      }
    })

    this._getPriceType()
    this._getLiveType()
  },

  /**
   * 解析主页信息
   */
  onAnylise(event) {
    mediaModel.getMsgForUrl(this.data.url).then(res => {
      this.data.isModify = false
      this.setData({
        accountName: res.data.accountName,
        accountDesc: res.data.accountDesc,
        headImg: res.data.headImg,
        fansNum: res.data.fansNum,
        accountId: res.data.accountId,
        disabled: true,
      })
    }).catch(e => {
      console.log(e);
    })
  },

  /**
   * 上传头像
   */
  onUpdate: function (event) {
    this._chooseImage()
      .then(res => {
        return this._updateImage(res);
      })
      .then(res => {

        if (res) {
          this.setData({
            headImg: res.data.url,
          });
        } else {
        }
      }, error => {

      });
  },

  /**
   * 价格变动
   */
  onPriceChanged: function (event) {
    let index = event.currentTarget.dataset.index
    let price = event.detail.value

    this.data.prices[index].typeId = this.data.prices[index].id
    this.data.prices[index].price = price
  },

  /**
   * 信息提交
   */
  onSubmit: function (event) {
    let value = event.detail.value;
    this.data.accountName = value.name
    this.data.accountId = value.id
    this.data.accountDesc = value.desc
    this.data.fansNum = value.fans

    this._addAcount()
  },

  /**
   * 小数点好保留两位
   */
  bindinput: function (e) {
    let money = e.detail.value
    let maxlength = -1
    let index = money.lastIndexOf('.')
    if (index != -1) {
      maxlength = index + 2 + 1;
    }
    this.setData({
      maxlength,
    })
  },

  /**
   * 获取报价类型
   */
  _getPriceType: function () {
    mediaModel.getPriceType()
      .then(res => {
        this.setData({
          prices: res.data
        })
      })
      .catch(exp => {

      })
  },

  /**
   * 获取账号类型
   */
  _getLiveType: function () {
    mediaModel.getLiveTypes().then(res => {
      this.setData({
        types: res.data
      })
    }).catch(exp => {

    })
  },

  /**
   * 提交添加账号 
   */
  _addAcount() {
    let mediaAccount = {}
    //账号名称
    if (this.data.accountName) {
      mediaAccount.accountName = this.data.accountName
    } else {
      wx.showToast({
        title: '账号名称不符合规范',
        icon: 'none',
      })
      return
    }
    //账号ID
    if (this.data.accountId) {
      mediaAccount.accountId = this.data.accountId
    } else {
      wx.showToast({
        title: '账号ID不符合规范',
        icon: 'none',
      })
      return
    }
    //头像
    if (this.data.headImg) {
      mediaAccount.headImg = this.data.headImg
    } else {
      wx.showToast({
        title: '账号头像不符合规范',
        icon: 'none',
      })
      return
    }
    //账号简介
    if (this.data.accountDesc) {
      mediaAccount.accountDesc = this.data.accountDesc
    }
    //粉丝
    if (this.data.fansNum) {
      mediaAccount.fansNum = this.data.fansNum
    }

    let mediaType = parseInt(this.data.plateform.id)
    mediaModel.addAccount({
      indexUrl: this.data.url,
      liveType: '',
      mediaAccountMsg: mediaAccount,
      prices: this.data.prices,
      mediaType: mediaType,
      liveType: this.data.types[this.data.index].id
    }).then(res => {
      wx.showToast({
        title: '账号添加成功',
        icon: 'none',
      })
      setTimeout(_ => wx.navigateBack(1), 1000)
    }).catch(exp => {
      let msg = exp.errmsg;
      wx.showToast({
        title: msg,
        icon: 'none',
      })
    })
  },

  /**
   * 选择照片
   */
  _chooseImage: function () {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
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
})