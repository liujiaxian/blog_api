
Page({
  data: {
    list: {},
    hidden: false,
    hasMore: true,
    page: 1,
    hasRefesh: false,
    windowHeight: 0,
    windowWidth: 0,
    typeid: 0
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    if (options != undefined) {
      this.data.typeid = options.typeid
    }
    var that = this
    wx.request({
      url: 'https://api.pqpqpq.cn/api/values/postcaselist?page=1&typeid=' + this.data.typeid,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        that.setData({
          list: res.data,
          hidden: true
        })

        if (res.data.length < 5) {
          that.setData({
            hasMore: false,
          })
        }
      },
      complete: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: "项目列表"
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
  //类型事件处理函数
  bindTypeInfo(e) {
    wx.navigateTo({
      url: '../caselist/caselist?typeid=' + e.target.dataset.id
    })
  },
  //博客详细处理函数
  bindCaseDetail(e) {
    wx.navigateTo({
      url: '../casedetail/casedetail?id=' + e.target.dataset.id
    })
  },
  //用户中心事件处理函数
  bindMemberInfo(e) {
    wx.navigateTo({
      url: '../memberinfo/memberinfo?id=' + e.target.dataset.id
    })
  },
  pullDownRefresh: function (e) {
    //console.log("下拉刷新....")
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    wx.stopPullDownRefresh() //停止下拉刷新
    var that = this
    that.setData({
      hasMore: true,
      page: 1,
      typeid: that.data.typeid
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
      url: 'https://api.pqpqpq.cn/api/values/postcaselist?page=' + this.data.page + "&typeid=" + this.data.typeid,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
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
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }, onShareAppMessage: function () {

  }
})