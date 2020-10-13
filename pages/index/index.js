// pages/index/index.js
const API = require('../../utils/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    shareList:null,
    user:null,
    notice:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // API.getShares().then(res =>{
    //   that.setData({
    //     shareList: res.data
    //   })
    // })
    API.getNotic().then(res =>{
      that.setData({
        notice: res.data
      })
    })
    that.setData({
      user: app.globalData.user
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
    var that = this
    if(app.globalData.shareList==null){
    API.getShares().then(res =>{
      that.setData({
        shareList: res.data
      })
      app.globalData.shareList = res.data
    })
    that.setData({
      user: app.globalData.user,
    })
  }
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
   * 切换tab
   */
  changeTab(e){
    this.setData({
      tab:e.currentTarget.dataset.tab
    })
  },

  /**
   * 兑换
   */
  duihuan(e){
    //取出绑定对象
    console.log(e)
    var share = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../duihuanSuccess/duihuanSuccess?share='+JSON.stringify(share),
    })
  },

  /**
   * 前往详情页
   */
  goDetail(e){
    //取出绑定对象
    console.log(e)
    var share = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shareDetail/shareDetail?share='+JSON.stringify(share),
    })
  }
})