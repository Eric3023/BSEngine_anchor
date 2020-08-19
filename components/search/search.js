// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
    keyword: String,
    placeholder: String,
    history: Array,
    hot: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    defaultKeyword: {
      keyword: '搜索'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 确认搜索
     */
    onConfirm: function (event) {
      this.triggerEvent("onConfirm", { value: event.detail.value });
    },

    /**
     * 清除搜索内容
     */
    onClear: function () {
      this.setData({
        keyword: ''
      });
      this.triggerEvent("onClear");
    },

    /**
     * 点击搜索历史
     */
    onHistoryClick: function (event) {

    },

    /**
     * 点击热门搜索
     */
    onHotClick: function (event) {

    },

    /**
     * 清空历史记录
     */
    onDeleteHistory: function(event){

    },
  }
})
