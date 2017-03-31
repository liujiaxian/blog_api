//在使用的View中引入WxParse模块
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    hidden: false,
    id: 0
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: "博客详情"
    })
  },
  //博客类型事件处理函数
  bindTypeInfo(e) {
    wx.navigateTo({
      url: '../bloglist/bloglist?typeid=' + e.target.dataset.id
    })
  },
  onLoad(options) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    if (options != undefined) {
      this.data.id = options.id
    }
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getblogdetail/' + this.data.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.tags) {
          var body = decodeURIComponent(res.data.tags);
          res.data.tags = body
        }

        var article = decodeURIComponent(res.data.content);
        WxParse.wxParse('article', 'md', article, that, 5);

        that.setData({
          blog: res.data,
          hidden: true
        })
      },
      complete: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载  
      }
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }, onShareAppMessage: function () {

  }, onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})