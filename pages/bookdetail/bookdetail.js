Page({
  data:{
    hidden:false,
    id:0
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
      url: '../booklist/booklist?typeid=' + e.target.dataset.id
    })
  },
  onReady:function(){
    // 页面渲染完成
     wx.setNavigationBarTitle({
      title: "图书详情"
    })
  },
  onLoad(options) {
     wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    if (options != undefined) {
      this.data.id = options.id
    }
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbookdetail/' + this.data.id,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.tags) {
          var body = decodeURIComponent(res.data.tags);
          res.data.tags = body
        }
        that.setData({
          book: res.data,
          hidden:true
        })
      },
      complete: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载  
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
   
  }, onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})