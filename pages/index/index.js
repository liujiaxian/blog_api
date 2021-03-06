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
    loading: true,
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
  //博客类型事件处理函数
  bindBlogTypeInfo(e) {
    wx.navigateTo({
      url: '../bloglist/bloglist?typeid=' + e.target.dataset.id
    })
  },
  //图书类型事件处理函数
  bindBookTypeInfo(e) {
    wx.navigateTo({
      url: '../booklist/booklist?typeid=' + e.target.dataset.id
    })
  },
  //项目类型事件处理函数
  bindCaseTypeInfo(e) {
    wx.navigateTo({
      url: '../caselist/caselist?typeid=' + e.target.dataset.id
    })
  },
  //博客详细处理函数
  bindBlogDetail(e) {
    wx.navigateTo({
      url: '../blogdetail/blogdetail?id=' + e.target.dataset.id
    })
  },
  //计划详细处理函数
  bindPlanDetail(e) {
    console.log(e);
    wx.navigateTo({
      url: '../plandetail/plandetail?id=' + e.target.dataset.id
    })
  },
  //图书详细处理函数
  bindBookDetail(e) {
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id=' + e.target.dataset.id
    })
  },
  //项目详细处理函数
  bindCasesDetail(e) {
    wx.navigateTo({
      url: '../casedetail/casedetail?id=' + e.target.dataset.id
    })
  }, onLoad() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let that = this

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbanner',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        //console.log(res.data.length);  
        that.setData({
          banner: res.data,
           hidden: true 
        })
      }, complete: function (res) {       
        wx.hideNavigationBarLoading() //完成停止加载

      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getblog',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          blog: res.data
        })
      }, complete: function (res) {       
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getplan',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          plan: res.data
        })
      }, complete: function (res) {       
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbook',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          book: res.data
        })
      }, complete: function (res) {       
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getcase',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, success: function (res) {
        that.setData({
          cases: res.data,
        })
      }, complete: function (res) {       
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })


  },
  onReady: function () {
    // 页面渲染完成
  }, onShareAppMessage: function () {
    return {
      title: '诺缘网',
      path: '/pages/index/index'
    }
  }, onPullDownRefresh: function () {
    console.log("dd")
    this.onLoad()
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})
