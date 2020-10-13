// pages/personal/personal.js

const app = getApp();
const API = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    linkList:[
      {
        id:1,
        text:'我的兑换',
        url:'/pages/wodeduihuan/wodeduihuan'
      },
      {
        id:2,
        text:'积分明细',
        url:'/pages/jifenmingxi/jifenmingxi'
      },
      {
        id:3,
        text:'我的投稿',
        url:'/pages/wodetougao/wodetougao'
      }
    ]
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
   * 登录，目前只是走个形式
   */
  weixinLogin(){
    API.login({
      openId: app.globalData.openId,
      wxNickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    }).then( res =>{
      const request = JSON.parse(res)
      console.log(request)
      app.globalData.user = request.user
      app.globalData.token = request.token.token
      this.setData({
        userInfo:app.globalData.user
      })
      //wx.setStorageSync('user', user)
    })
  }
})