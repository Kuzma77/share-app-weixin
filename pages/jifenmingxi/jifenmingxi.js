// pages/jifenmingxi/jifenmingxi.js
const app = getApp()
const API  = require('../../utils/request.js')
const TimeUtil = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bonusLogList:null
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
    this.getBonusLogs()
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
  //获取积分明细
  getBonusLogs(){
    API.getMyBonusLog({
      userId:app.globalData.user.id
    }).then(res =>{
      console.log(res)
      const logs = res.data
      if(logs!=null){
        logs.forEach(element => {
          const date = new Date(element.createTime)
          element.createTime = TimeUtil.formatTime(date)
        });
      }
      this.setData({
        bonusLogList:logs
      })
    })
  }
})