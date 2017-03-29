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
    plain: false
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
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  //类型事件处理函数
  bindTypeInfo(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  //博客详细处理函数
  bindBlogDetail(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore(e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: '' + (Number(utils.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad() {
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
      },
      fail: function (res) {
        //console.log('submit fail'+JSON.stringify(res));  
      },
      complete: function (res) {
        //console.log('submit complete'+res);  
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
      },
      fail: function (res) {
        //console.log('submit fail'+JSON.stringify(res));  
      },
      complete: function (res) {
        //console.log('submit complete'+res);  
      }
    })

    this.index = 1
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

  }
})
