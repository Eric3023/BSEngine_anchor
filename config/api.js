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
  Banner: BaseApi + '/wx/index/banner',
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
  //活动取消收藏
  activityDelLike: BaseApi + '/api/activity/delLikeActivity',
  //活动收藏列表
  activityLikeList: BaseApi + '/api/activity/getLikeActivity',

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
  //获取订单质检信息
  qualityAssessment: BaseApi + '/api/activity/getQualityAssessment',
  //获取订单详情
  orderDetail: BaseApi + '/api/activity/getOrderDeatil',

  //用户信息接口
  UserInfo: BaseApi + '/wx/user/index',
  //意见反馈
  feedback: BaseApi + '/wx/feedback/add',
  //绑定银行卡
  addBank: BaseApi + '/wx/bank/add',
  //查询银行卡
  listBank: BaseApi + '/wx/bank/list',
  //解绑银行卡
  delBank: BaseApi + '/wx/bank/del',

  //手机验证码
  regCaptcha: BaseApi + '/wx/auth/regCaptcha',
  //手机号注册
  register: BaseApi + '/wx/auth/register',
  //手机号登录
  login: BaseApi + '/wx/auth/login',
  //手机号登录
  changePassword: BaseApi + '/wx/auth/reset',
  //分享验证码
  shareUrl: BaseApi + '/wx/user/getSharedUrl',
  //邀请好友记录
  inviteFriend: BaseApi + '/api/statistics/getInviteFriend',

  //上传图片接口
  Upload: WxApiRoot + 'storage/upload',

  //图片根地址
  BaseImgApi: BaseApi,

  //充值记录接口
  PayRecord: WxApiRoot + 'pay/payRecord',
  //优惠券列表
  Coupons: WxApiRoot + 'coupon/mylist',
  //代开发票列表
  NoUserInvoice: WxApiRoot + 'pay/noUseInvoice',
  //开具发票
  OpenInvoice: WxApiRoot + 'pay/openInvoice',
  //收益统计
  profit: BaseApi + '/api/statistics/getProfitEveryDay',

  //用户余额接口
  UserBalance: WxApiRoot + 'recharge/userBalance',

  //对公账户接口
  BankAccount: WxApiRoot + 'recharge/bankAccount',

  //确认充值接口
  RechargeConfirm: WxApiRoot + 'recharge/recharge',

  RechargePrepay: WxApiRoot + 'pay/prepay', //订单的预支付会话

  //提现接口
  withdraw: BaseApi + '/wx/pay/withdrawDeposit',
  //提现记录
  withdrawRecord: BaseApi + '/wx/pay/withdrawRecord'

};