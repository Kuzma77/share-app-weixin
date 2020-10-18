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
        url:'/pages/wodeduihuan/wodeduihuan',
        roles:['user','admin']
      },
      {
        id:2,
        text:'积分明细',
        url:'/pages/jifenmingxi/jifenmingxi',
        roles:['user','admin']
      },
      {
        id:3,
        text:'我的投稿',
        url:'/pages/wodetougao/wodetougao',
        roles:['user','admin']
      },
      {
        id:4,
        text:'审核投稿',
        url:'/pages/shenhetougao/shenhetougao',
        roles:['admin']
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
    app.globalData.user!=null?this.updateUserInfo(): false
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              this.login()
              //console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login(){
    API.login({
      openId: app.globalData.openId,
      wxNickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    }).then( res =>{
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      const request = JSON.parse(res)
      console.log(request)
      app.globalData.user = request.data.user
      this.updateUserInfo()
      app.globalData.token = request.data.token.token
      // wx.setStorageSync('user', request.user)
      // wx.setStorageSync('token', request.token)
      this.setData({
        userInfo:app.globalData.user
      })
    })
  },
  exit(){
    app.globalData.user = null
    app.globalData.token = null
    this.setData({
      userInfo:null
    })
  },
  updateUserInfo(){
    API.update({
      id:app.globalData.user.id
    }).then(res =>{
      if(res.succ){
        app.globalData.user = res.data
        this.setData({
          userInfo:app.globalData.user
        })
        console.log(app.globalData.user)
      }
    })
  }
})