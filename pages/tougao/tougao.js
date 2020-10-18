// pages/tougao/tougao.js
const API = require("../../utils/request.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share:{
      title:'',
      isOriginal:0,
      cover:'',
      author:'',
      summary:'',
      price:0,
      downloadUrl:''
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(typeof options.share != 'undefined'){
      this.setData({
        share: JSON.parse(options.share)
      })
      console.log(this.data.share)
    }
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

  },
  /**
   * 绑定单选按钮
   */
  radioChange(e) {
    const isOriginal = "share.isOriginal"
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      [isOriginal]:e.detail.value
    })
  },

  bindTitle(e){
    const title = "share.title"
    this.setData({
      [title]:e.detail.value
    })
  },
  bindAuthor(e){
    const author = "share.author"
    this.setData({
      [author]:e.detail.value
    })
  },
  bindPrice(e){
    const price = "share.price"
    this.setData({
      [price]:e.detail.value
    })
  },
  bindSummary(e){
    const summary = "share.summary"
    this.setData({
      [summary]:e.detail.value
    })
  },
  bindDownloadUrl(e){
    const downloadUrl = "share.downloadUrl"
    this.setData({
      [downloadUrl]:e.detail.value
    })
  },
  submit(){
    var that = this
    console.log(that.data.share)
    if(app.globalData.user != null){
    if(that.validate()){
      if(that.data.share.updateStatus){
        that.updateContribution()
      }else{
        that.contribution()
      }
    }else{
      wx.showToast({
        title: '参数异常，请检查',
        icon: 'none',
        duration: 1000
      })
    }
  }
  else{
    wx.showToast({
      title: '请先去登录',
      icon: 'none',
      duration: 1000
    })
  }

  },
  validate(){
    if(this.data.share.title==''||this.data.share.author==''||this.data.share.summary==''||this.data.share.downloadUrl==''){
      return false
    }
    else
    return true
  },
  /**
   * 正常投稿
   */
  contribution(){
    var that = this
    const cover = '../../image/'+ Math.floor(Math.random()*4+1)+'.jpg'
    API.contribution({
      userId:app.globalData.user.id,
      title: that.data.share.title,
      isOriginal: that.data.share.isOriginal==1,
      author:that.data.share.author,
      cover:cover,
      summary:that.data.share.summary,
      price:that.data.share.price,
      downloadUrl:that.data.share.downloadUrl,
      reason:''
    }).then(res =>{
      console.log(res)
      const data = JSON.parse(res)
      if(data.succ){
        wx.showToast({
          title: '投稿成功',
          success:res =>{
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }else{
        wx.showToast({
          title: '投稿异常',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  /**
   * 更新投稿
   */
  updateContribution(){
    var that = this
    const cover = '../../image/'+ Math.floor(Math.random()*4+1)+'.jpg'
    API.updateContribution({
      shareId:that.data.share.id, 
      userId:app.globalData.user.id,
      title: that.data.share.title,
      isOriginal: that.data.share.isOriginal==1,
      author:that.data.share.author,
      cover:cover,
      summary:that.data.share.summary,
      price:that.data.share.price,
      downloadUrl:that.data.share.downloadUrl,
      reason:''
    }).then(res =>{
      console.log(res)
      const data = JSON.parse(res)
      if(data.succ){
        wx.showToast({
          title: '投稿成功',
          success:res =>{
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }else{
        wx.showToast({
          title: '投稿异常',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }
})