
var qqmaputil = require('../../utils/qqmaputil.js');

const app = getApp();

Page({
  data: {
    //搜索关键词
    keyword: '',
    //搜索页码
    page: 1,
    //搜索结果
    data: [],
    //搜索记录
    history:[],
    //热门搜索
    hot:[],
  },

  onLoad: function (options) {
    this._loadHis();//载入搜索历史记录
    this._loadHot();//载入热门搜索
  },

  /**
   * 加载搜索历史
   */
  _loadHis() {
    let history = wx.getStorageSync("searchHisArray");
    if (Array.isArray(history)) {
      this.setData({
        history: history
      })
    }
  },

  /**
   * 加载热门搜索
   */
  _loadHot() {
    let history = wx.getStorageSync("searchHisArray");
    if (Array.isArray(history)) {
      this.setData({
        hot: history
      })
    }
  },

  /**
   * 添加历史记录
   */
  addHistory: function (value) {
    let history = wx.getStorageSync("searchHisArray");
    if (!Array.isArray(history)) {//判断本地缓存是否有数组，如果没有，则新建
      that.setData({
        history: [value]//更新历史显示列表
      })
      wx.setStorage({//更新存储的历史
        key: 'searchHisArray',
        data: that.data.history
      })
      return;
    }

    //如果存在了，则读取本地缓存
    if (history !== null) {
      let num = history.indexOf(value);
      if (num != -1) {
        // 删除已存在后重新插入至数组
        history.splice(num, 1);
        history.unshift(value);
      } else {
        history.unshift(value);
      }
    }

    if (history.length >= 50) {
      history.splice(49, 1);
    }

    //存储搜索记录
    wx.setStorage({
      key: "searchHisArray",
      data: history
    })

    that.setData({
      history: history
    })

  },

  /**
   * 清空历史记录
   */
  clearHistory: function () {
    this.setData({
      hisSearchData: []
    });
    wx.clearStorage("searchHisArray");
  },

  /**
   * 修改检索关键词，重新搜索
   */
  _searchList(value) {
    //重新搜索，页码和搜索结果需要重置
    this.data.page = 1;
    this.data.siteData = [];
    //修改搜索框的显示内容
    this.setData({
      keyword: value
    });
    this.getSearchResult(value);
  },

  /**
   * 不修改检索关键词，加载更多结果
   */
  _searchMoreList(value) {
    //加载更多，页码递增
    this.data.page++;
    this.getSearchResult(value);
  }
})