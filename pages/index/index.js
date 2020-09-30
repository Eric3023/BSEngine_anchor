const homeModel = require('../../models/home.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    // Banner默认轮播图(防止网络数据获取失败，显示空白)
    banners: [
      { imageUrl: '/img/banner/banner1.jpg' },
    ],
    defaultBanner: '/img/banner/banner1.jpg',

    //宣传图
    publicity: [],

    //是否显示霸屏
    bullying: false,
    bullyInfo: false,
  },

  /**
   * 加载页面
   */
  onLoad: function (options) {
    let inviter = options.inviter
    if(inviter){
      wx.setStorageSync('inviter', inviter)
    }

    this._getBanners();//请求轮播图
    this._getPublicity();//获取宣传图片
    this._getCouponing();//显示优惠券
  },

  /**
   * 分享页面
   */
  onShareAppMessage() {

  },

  /**
   * 导航进入其他页面
   */
  onNavigator(event) {
    const index = event.currentTarget.dataset.index;
    switch (index) {
      case 0:
        wx.navigateTo({
          url: '/pages/invitation/invitation',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/guide/guide',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/tasks/tasks',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/profit/profit',
        })
        break;
    }
  },

  /**
   * 导航进入其他页面
   */
  onClick(event) {
    const index = event.currentTarget.dataset.index;
    switch (index) {
      case '猜你喜欢':
        wx.navigateTo({
          url: '/pages/collection/collection?title=猜你喜欢',
        })
        break;
      case '平台推荐':
        wx.navigateTo({
          url: '/pages/collection/collection?title=平台推荐',
        })
        break;
    }
  },

  /**
   * Banner图片加载失败(显示默认图片)
   */
  onBannerError(event) {
    const index = event.currentTarget.dataset.index;
    this.data.banners[index].imageUrl = this.data.defaultBanner;
    this.setData({
      banners: this.data.banners,
    });
  },

  /**
   * 点击了活动Item
   */
  onClickItem: function (event) {
    wx.navigateTo({
      url: '/pages/rob/rob',
    })
  },

  /**
   * 点击顶部搜索按钮
   */
  onSearch(event) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 关闭优惠霸屏
   */
  onCloseCoupon() {
    app.globalData.couponing = false;
    this.setData({
      bullying: false,
      bullyInfo: false,
    });
  },

  /**
   * 领取优惠券
   */
  onConfirCoupon() {
    app.globalData.couponing = false;
    this.setData({
      bullying: false,
      bullyInfo: true,
    });
    setTimeout(res => {
      console.log('已领取优惠券');
      this.onCloseCoupon();
    }, 3000)
  },

  /**
   * 获取轮播图
   */
  _getBanners() {
    homeModel.getBanners().then(
      res => {
        let banners = res.data;
        if (banners) {
          this.setData({
            banners: banners
          });
        }
      },
      error => {

      }
    );
  },

  /**
   * 获取宣传图
   */
  _getPublicity() {
    homeModel.getPublicity().then(res => {
      this.setData({
        publicity: res.data,
      })
    }).catch(exp => {

    })
  },

  /**
   * 是否需要显示霸屏
   */
  _getCouponing() {
    this.setData({
      bullying: app.globalData.couponing,
    });
  },

})
