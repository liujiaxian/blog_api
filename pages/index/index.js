//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
    hidden: false,
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  //用户中心事件处理函数
  bindMemberInfo(e) {
    wx.navigateTo({
      url: '../memberinfo/memberinfo?id=' + e.target.dataset.id
    })
  },
  //类型事件处理函数
  bindIndexTypeInfo(e) {
    wx.navigateTo({
      url: '../bloglist/bloglist?typeid=' + e.target.dataset.id
    })
  },
  //博客详细处理函数
  bindBlogDetail(e) {
    wx.navigateTo({
      url: '../blogdetail/blogdetail?id=' + e.target.dataset.id
    })
  }, onLoad() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let that = this
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbanner',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        //console.log(res.data.length);  
        that.setData({
          banner: res.data,
        })
      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getblog',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          blog: res.data
        })
      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getplan',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          plan: res.data
        })
      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbook',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          book: res.data
        })
      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getcase',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          case: res.data
        })
      }
    })

    that.setData({
      hidden: true
    })
  },
  onReady: function () {
    // 页面渲染完成
    wx.hideNavigationBarLoading() //完成停止加载
  }, onShareAppMessage: function () {
    return {
      title: '诺缘网',
      path: '/pages/index/index'
    }
  }
})
