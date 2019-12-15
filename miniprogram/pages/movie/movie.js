// pages/movie/movie.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    movielist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getmovielist:function(){//获取电影列表函数
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'movieList',//调用云函数请求的数据
      data: {
        start: this.data.movielist.length,
        count: 10
      },
    }).then(res => {
      this.setData({
        movielist: this.data.movielist.concat(JSON.parse(res.result).subjects)
      })
      console.log(res);
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  },
  gotoComment:function(event){//跳转到评论的电影页面
    wx.navigateTo({
      url: `../detail/detail?movieid=${event.target.dataset.movieid}`,//获取自定义属性
    })
    
  },
  onLoad: function (options) {
    this.getmovielist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getmovielist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})