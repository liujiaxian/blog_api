Page({
  data:{
    hidden:false
  },
  //用户中心事件处理函数
  bindMemberInfo(e) {
    wx.navigateTo({
      url: '../memberinfo/memberinfo?id=' + e.target.dataset.id
    })
  },
  //图书类型事件处理函数
  bindTypeInfo(e) {
    wx.navigateTo({
      url: '../caselist/caselist?typeid=' + e.target.dataset.id
    })
  },
  onReady:function(){
    // 页面渲染完成
     wx.setNavigationBarTitle({
      title: "项目详情"
    })
  },
  onLoad(options) {
    var that = this
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getcasedetail/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
         if (res.data.content) {
          var body = decodeURIComponent(res.data.content);
          res.data.content = body
        }
        that.setData({
          cases: res.data,
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