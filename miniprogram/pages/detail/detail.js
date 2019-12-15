// pages/detail/detail.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:[],
    valueRate:5,
    valueComment:'',
    images:[],
    fileids:[],
    movieid:-1,
  },
  onChangeRate:function(event){
    this.setData({
      valueRate:event.detail
    })
  },
  submit:function(){
    wx.showLoading({
      title: '评价中',
    })
    let promiseArr=[];
    promiseArr.push(new Promise( (resolve,reject)=>{
      for(let i=0;i<this.data.images.length;i++){//上传文件需要一个个上传
        let item=this.data.images[i];
        let houzhui=/\.\w+$/.exec(item)[0]//正则表达式匹配扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+houzhui,
          filePath: item, // 文件路径
          success: res => {
            this.setData({
              fileids:this.data.fileids.concat(res.fileID)
            })
            resolve();
            console.log(res.fileID)
          },
          fail: err => {
            // handle error
          }
        })
      }
    }
  ))
    Promise.all(promiseArr).then(res=>{
      db.collection('comments').add({
        data:{
          valueRate: this.data.valueRate,
          valueComment: this.data.valueComment,
          fileids: this.data.fileids,
          movieid: this.data.movieid,
        }
      }).then( res=>{
        wx.hideLoading();
        wx.showToast({
          title: '评价成功',
        })
      }).catch( err=>{
        wx.showToast({
          title: '评价失败',
        })
        wx.hideLoading();
      })
    })
  },
  onChangeComment:function(event){
    valueComment:event.detail
  },
  upload:function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieid:options.movieid
    })
    wx.cloud.callFunction({
      name:'getdetails',
      data:{
        movieid:options.movieid,
      }
    }).then( res=>{
      this.setData({
        details:JSON.parse(res.result),
      })
      console.log(res);
    }).catch( err=>{
      console.log(err);
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})