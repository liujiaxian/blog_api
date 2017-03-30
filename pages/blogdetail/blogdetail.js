Page({
  data:{
    hidden:false
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
          blog: res.data,
          hidden:true
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
   
  }
})