const userModel = require('../../models/user.js');
const UserInfoHelper = require('../../utils/userInfo.js')
const config = require('../../config/api.js')

const userInfoHelper = new UserInfoHelper();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    authored: 0,//0:未认证；1：认证中；2：已认证
    hasLogin: false,
    balance: '0.00',
    user_info: {
      uicon: "",
      uid: "",
      flag: false,//是否缓存用户信息
    },
    user_datas: [
      { icon: "/img/mine/icon_mine_collection.jpg", title: "银行卡" },
      { icon: "/img/mine/icon_mine_rmb.jpg", title: "订单规则" },
      // { icon: "/img/mine/icon_mine_quan.jpg", title: "意见反馈" },
      { icon: "/img/mine/icon_mine_proxy.jpg", title: "意见反馈" },
      { icon: "/img/mine/icon_mine_setting.png", title: "设置" }
    ],
    data: {
      likesNum: 0,
      orderNum: 0,
      totalAmount: 0.00,
    }
  },

  /**
   * 进入下级页面
   */
  onClick: function (event) {
    let index = event.currentTarget.dataset.index;
    switch (index) {
      case '我的喜欢':
        wx.navigateTo({
          url: '/pages/collection/collection?title=我的喜欢',
        })
        break;
      case '已经播报':
        wx.navigateTo({
          url: '/pages/tasks/tasks?type=2,3',
        })
        break;
    }
  },

  /**
   * 进入下级页面
   */
  onClickItem(event) {
    let index = event.detail.title;
    switch (index) {
      case '银行卡':
        wx.navigateTo({
          url: '/pages/banks/banks',
        })
        break;
      case '意见反馈':
        wx.navigateTo({
          url: '/pages/feedback/feedback',
        })
        break;
      case '订单规则':
        wx.navigateTo({
          url: `/pages/webview/webview?url=${config.BaseImgApi + "html/policy.html"}`,
        })
        break;
      case '设置':
        wx.navigateTo({
          url: '/pages/setting/setting',
        })
        break;
    }
  },

  /**
   * 生命周期函数
   */
  onLoad: function (option) {
    this._resetUserInfo();
    this._checkLogin();
  },

  onWithdraw: function () {
    wx.navigateTo({
      url: '/pages/withdraw/withdraw',
    })
  },

  onShow() {
    if (this.data.hasLogin === true) {
      this._getBalance();
    }
  },

  /**
   * 转发
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击Button，获取用户信息
   */
  getWxUserInfo(event) {
    console.log(event);
    var that = this
    // 声明一个变量接收用户授权信息
    var userinfo = event.detail.event.userInfo;
    if (userinfo != undefined) {
      that.setData({
        user_info: {
          uicon: userinfo.avatarUrl,
          uid: userinfo.nickName,
          flag: true,
        }
      })

      //存储用户信息
      wx.setStorageSync('uicon', userinfo.avatarUrl);
      wx.setStorageSync('uid', userinfo.nickName);
    }
  },

  /**
   * 检查登录
   */
  _checkLogin() {
    let token = wx.getStorageSync("token");
    let phone = wx.getStorageSync("phone");
    //必须登录才能查看
    console.log(token);
    if (!token || token == '') {
      wx.showModal({
        title: "提示",
        content: "登录后体验更多功能",
        cancelText: "取消",
        confirmText: "去登录",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
      });
      //未登录不显示头像
      this._resetUserInfo()
    } else {
      this.setData({
        phone: phone,
        hasLogin: true
      });
      //登录之后才显示头像
      this._getStorageUserInfo();
    }
  },

  /**
   * 获取用户信息
   */
  _getBalance() {
    userModel.getUserInfo().then(
      res => {
        let balance = res.data.totalAmount;
        res.data.balance = balance.toFixed(2);
        this.setData({
          data: res.data,
        });
      }
    ).catch(e => {
      console.log(e);
    });
  },

  /**
   * 重置UserInfo
   */
  _resetUserInfo() {
    this.setData({
      user_info: {
        uicon: "",
        uid: "",
        flag: false,
      },
      balance: '0.00',
    });
  },


  /**
   * 本地持久化中获取用户信息
   */
  _getStorageUserInfo() {
    let uicon = wx.getStorageSync("uicon");
    let uid = wx.getStorageSync("uid");
    this.data.user_info.uicon = uicon;
    this.data.user_info.uid = uid;
    if (uicon) {
      this.data.user_info.flag = true;
      this.setData({
        user_info: this.data.user_info
      });
    } else {
      this.data.user_info.flag = false;
      this.setData({
        user_info: this.data.user_info
      });
    }
  },

  /**
   * API获取用户信息
   */
  _getUserInfo() {
    userInfoHelper.getUserInfo({
      success: res => {
        this.setData({
          user_info: {
            uicon: res.userInfo.avatarUrl,
            uid: res.userInfo.nickName,
            flag: true,
          }
        });
      },
      fail: error => {
        this.setData({
          user_info: {
            uicon: "",
            uid: "",
            flag: false,
          }
        });
      },
    })
  },
})