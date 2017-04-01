//在使用的View中引入WxParse模块
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    loading: true,
    hidden: false,
    id: 0
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: "轮播详情"
    })
  },
  //用户中心事件处理函数
  bindMemberInfo(e) {
    wx.navigateTo({
      url: '../memberinfo/memberinfo?id=' + e.target.dataset.id
    })
  },//类型事件处理函数
  bindTypeInfo(e) {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  onLoad(options) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    if (options != undefined) {
      this.data.id = options.id
    }
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbannerdetail/' + this.data.id,
      method: 'GET',
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
          banner: res.data,
          hidden: true
        })
      },
      complete: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载  
      }
    })
  }, onShareAppMessage: function () {

  }, onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})