Page({
  data: {
    list: {},
    hidden: false,
    hasMore: true,
    page: 0,
    hasRefesh: false,
    windowHeight: 0,
    windowWidth: 0
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "轮播列表"
    })
  },
  //用户中心事件处理函数
  bindMemberInfo(e) {
    wx.navigateTo({
      url: '../memberinfo/memberinfo?id=' + e.target.dataset.id
    })
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/getbanner',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data,
          hidden: true
        })
        //console.log(res.data)
      },
      complete: function (res) {
        //console.log('submit complete'+res);  
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  }, onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullDownRefresh: function (e) {
    //console.log("下拉刷新....")
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    wx.stopPullDownRefresh() //停止下拉刷新
    var that = this
    this.setData({
      hasMore: true,
      page: 0
    })
  },

  pullUpLoad: function (e) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    this.setData({
      page: this.data.page + 1
    })

    if (!this.data.hasMore) {
      wx.hideNavigationBarLoading() //完成停止加载
      return
    }

    //console.log("上拉拉加载更多...." + this.data.page)

    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/postbannerlist?page=' + this.data.page,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        if (res.data == null) {
          that.setData({
            hasMore: false,
          })

        } else {
          that.setData({
            list: that.data.list.concat(res.data)
          })
        }


      },
      complete: function (res) {
        //console.log('submit complete'+res); 
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },onShareAppMessage: function () {
   
  }
})