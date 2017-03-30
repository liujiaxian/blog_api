// pages/member/member.js
Page({
  data:{
    hidden:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getmemberinfo/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          member: res.data,
          hidden:true
        })
      },
      complete: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载  
      }
    })
  },
  onReady:function(){
     wx.setNavigationBarTitle({
      title: "会员信息"
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