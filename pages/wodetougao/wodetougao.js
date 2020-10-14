// pages/wodetougao/wodetougao.js
const app = getApp()
const API  = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareList: null,
    pageNo: 1,
    pageSize:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getMyShares()
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
   * 获取我的投稿数据
   */
  getMyShares(){
    var that = this
    console.log(app.globalData.user.id)
    API.getMyShares({
      pageNo:that.data.pageNo,
      pageSize:that.data.pageSize,
      userId:app.globalData.user.id
    }).then(res =>{
      console.log(res.data)
      this.setData({
        shareList:res.data
      })
      app.globalData.shareList = res.data
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
})