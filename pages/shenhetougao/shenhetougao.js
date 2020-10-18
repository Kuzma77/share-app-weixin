// pages/shenhetougao/shenhetougao.js
const API = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShares()
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
    this.getShares()
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
    this.getShares()
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
   * 获取列表
   */
  getShares(){
    var that = this
     API.getNotYetShares().then(res =>{
      that.setData({
        shareList:res.data
      })
      wx.stopPullDownRefresh({
        complete: (res) => {},
      })
  })
},
/**
 * 审核通过
 */
pass(e){
  API.updateAuditStatus({
    id:e.currentTarget.dataset.id,
    auditStatusEnum:'PASSED',
    reason: '审核通过'
  }).then(res =>{
    console.log(res)
    wx.showToast({
      title: '审核通过',
    })
    this.getShares()
  })
  
}
})