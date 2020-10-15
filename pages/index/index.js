// pages/index/index.js
const API = require('../../utils/request.js')
const ifHasdownloadUrl = require('../../utils/IfHasdownloadUrl.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    shareList:null,
    user:null,
    notice:null,
    pageNo:1,
    pageSize: 5
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
    // that.setData({
    //   shareList: app.globalData.shareList
    // })
    // console.log(that.data.pageNo)
    API.getShares({
      pageNo:that.data.pageNo,
      pageSize:that.data.pageSize
    }).then(res =>{
      const shares = res.data
      //添加ifHasdownloadUrl属性
      if(shares!==null){ 
      shares.forEach(element => {
        element['ifHasdownloadUrl'] = ifHasdownloadUrl.ifHasdownLoadUrl(element)
      });
      console.log(shares)
      // app.globalData.shareList = shares
    }
    that.setData({
      shareList: shares,
      user: app.globalData.user,
    })
    })
    },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      pageNo:1
    })
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
   * 下一页
   */
  onReachBottom: function () {
    var that = this
    that.setData({
      pageNo:that.data.pageNo+1
    })
    API.getShares({
      pageNo:that.data.pageNo,
      pageSize:that.data.pageSize
    }).then(res =>{
      const shares = res.data
      //添加ifHasdownloadUrl属性
      if(shares!==null){ 
      shares.forEach(element => {
        element['ifHasdownloadUrl'] = ifHasdownloadUrl.ifHasdownLoadUrl(element)
      }); 
      console.log(shares)
    }

      // app.globalData.shareList = app.globalData.shareList.concat(shares)
      that.setData({
        shareList:that.data.shareList.concat(shares)
      })
    
    })
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
    const url = share.ifHasdownloadUrl? '../duihuanSuccess/duihuanSuccess?share='+JSON.stringify(share):'../shareDetail/shareDetail?share='+JSON.stringify(share)
    wx.navigateTo({
      url: url
    })
  }


 
})