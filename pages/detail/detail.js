Page({
  data: {
    loading: true,
    hidden:false
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: "轮播详情"
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
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbannerdetail/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.content) {
          var body = decodeURIComponent(res.data.content);
          res.data.content = body
        }
        that.setData({
          banner: res.data,
          hidden:true
        })
      },
      complete: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载  
      }
    })
  },onShareAppMessage: function () {
   
  }
})