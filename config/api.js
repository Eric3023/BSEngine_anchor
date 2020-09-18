// 本机开发API地址
// var BaseApi = 'http://127.0.0.1:8070/';
// 局域网开发API地址
var BaseApi = 'http://192.168.1.105:9000/';
// var BaseApi = 'http://192.168.1.19:8070/';
// 线上云平台api地址
// var BaseApi = "https://zt.ottauto.tv/"

var WxApiRoot = BaseApi + 'wx/';

module.exports = {

  //微信登录
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin',
  //根据手机号登录
  AuthPhoneLoginByWeixin: WxApiRoot + 'auth/phone_login_by_weixin',

  //首页Banner
  Banner: BaseApi + '/wxindex/banner',
  //首页宣传
  index: BaseApi + '/wx/index/static',

  //获取账号列表
  mediaList: BaseApi + '/api/mediaAccount/getListByUserId',
  //获取平台类型
  mediaType: BaseApi + '/api/mediaAccount/getMedias',
  //获取账号类型
  liveType: BaseApi + '/api/mediaAccount/getLiveTypes',
  //主播主页信息
  mediaMsg: BaseApi + '/api/mediaAccount/getMsgForUrl',
  //主播报价类型
  priceType: BaseApi + '/api/mediaAccount/getBroadcastTypes',
  //添加主播账号
  addAcount: BaseApi + '/api/mediaAccount/addMediaAccount',

  //活动列表
  activityList: BaseApi + '/api/activity/getLiveActivitys',
  //活动详情
  activityDetail: BaseApi + '/api/activity/getActivityDeatil',
  //活动抢单
  activityRob: BaseApi + '/api/activity/receivingOrder',
  //活动收藏
  activityLike: BaseApi + '/api/activity/likeActivity',

  //已抢订单
  liveOrders: BaseApi + '/api/activity/getLiveOrders',
  //取消订单
  cancelOrder: BaseApi + '/api/activity/cancelOrder',
  //删除订单
  delOrder: BaseApi + '/api/activity/delOrder',
  //执行订单
  exeOrder: BaseApi + '/api/activity/implementOrder',
  //质检订单
  qualityOrder: BaseApi + '/api/activity/qualityAssessment',

  //用户信息接口
  UserInfo: BaseApi + '/wx/user/index',
  //意见反馈
  feedback: BaseApi + '/wx/feedback/add',

  //上传图片接口
  Upload: WxApiRoot + 'storage/upload',


  //图片根地址
  BaseImgApi: BaseApi,

  //行业分类
  LocationCategory: WxApiRoot + 'index/allCategory',
  //周边用户数
  AroundUsers: WxApiRoot + 'index/userNums',
  //获取投放广告位
  AdPlaces: WxApiRoot + 'advertising/getAdPlaces',
  //车型列表
  CarTypes: WxApiRoot + 'advertising/getCarTypes',
  //投放模板
  Templates: WxApiRoot + 'advertising/getTemplates',
  //投放
  DoAdvertising: WxApiRoot + 'advertising/doAdvertising',
  //充值记录接口
  PayRecord: WxApiRoot + 'pay/payRecord',
  //订单列表
  Order: WxApiRoot + 'advertising/getAdvertisings',
  //企业认证
  Author: WxApiRoot + 'ocr/auth',
  //优惠券列表
  Coupons: WxApiRoot + 'coupon/mylist',
  //代开发票列表
  NoUserInvoice: WxApiRoot + 'pay/noUseInvoice',
  //开具发票
  OpenInvoice: WxApiRoot + 'pay/openInvoice',
  //投放详情
  ThrowDetail: WxApiRoot + 'advertising/getAdvertisingInfo',
  //获取模板预览图片
  PreviewImage: WxApiRoot + 'advertising/getTemplateImgUrl',
  //投放价格表
  AllPrices: WxApiRoot + 'advertising/getAllPrices',


  //用户余额接口
  UserBalance: WxApiRoot + 'recharge/userBalance',

  //对公账户接口
  BankAccount: WxApiRoot + 'recharge/bankAccount',

  //确认充值接口
  RechargeConfirm: WxApiRoot + 'recharge/recharge',

  RechargePrepay: WxApiRoot + 'pay/prepay', //订单的预支付会话

};