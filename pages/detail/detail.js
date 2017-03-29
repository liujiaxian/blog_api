Page({
  data: {
    loading: true,
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad(options) {
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
          banner: res.data
        })
      }
    })
  }
})