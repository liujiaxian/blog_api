// pages/blogdetail/blogdetail.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
     wx.setNavigationBarTitle({
      title: "博客详情"
    })
  },
  onLoad(options) {
    var that = this
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getblogdetail/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.content) {
          var body = decodeURIComponent(res.data.content);
          res.data.content = body
        }
        that.setData({
          blog: res.data
        })
      }
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },onShareAppMessage: function () {
    return {
      title: "博客详情",
      path: '/page/index/index'
    }
  }
})