// pages/duihuanSuccess/duihuanSuccess.js
const app = getApp()
const API = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      share: JSON.parse(options.share)
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

  },

   /**
   * 兑换
   */
  exchange(e){
    //取出绑定对象
    console.log(e)
    var share = e.currentTarget.dataset.item
    if(app.globalData.user!=null){
    API.exchange({
      userId: app.globalData.user.id,
      shareId: share.id
    }).then(res =>{
      console.log(res)
      const request = JSON.parse(res)
      if(request.succ){
        API.update({
          id:app.globalData.user.id
        }).then(res =>{
          if(res.succ){
            app.globalData.user = res.data
            console.log(app.globalData.user)
          }
        })
        wx.showToast({
          title: '兑换成功',
          icon: 'success',
          duration: 2000,
          success:function(res){
            wx.redirectTo({
              url: '../duihuanSuccess/duihuanSuccess?share='+JSON.stringify(share),
            })
          }
        })
      }else{
        wx.showToast({
          title: '兑换异常',
          icon: 'none',
          duration: 1500
        })
      }
    })
  }
  else{
    wx.showToast({
      title: '请先去登录',
      icon: 'none',
      duration: 1500
    })
  }
  },
})