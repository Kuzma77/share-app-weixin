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
    pageSize: 5,
    more:true,
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotice()
    this.getShares(true)
    this.setData({
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
    this.getShares(true)
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
    this.getShares(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   * 下一页
   */
  onReachBottom: function () {
    if(!this.data.more){
      wx.showToast({
        title: '已加载完毕',
        duration: 1000
      })
      return false
    }
    this.setData({
      pageNo:this.data.pageNo+1
    })
    this.getShares()
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
  },

  /**
   * 获取分享列表
   * @param {boolean} init 
   */
  getShares(init){
    var that = this
    if(init){
      that.setData({
        pageNo:1,
        more:true
      })
    }
     API.getShares({
      title:that.data.title,
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
    if(init){
      that.setData({
        shareList:shares
      })
      wx.stopPullDownRefresh({
        complete: (res) => {},
      })
    }else{
      that.setData({
        shareList:that.data.shareList.concat(res.data)
      })
    }
    if(res.data.length < that.data.pageSize&&that.data.pageNo>0){
      that.setData({
        more:false
      })
    }
    })
  },

  /**
   * 获取最新公告
   */
  getNotice(){
    var that = this
    API.getNotic().then(res =>{
      that.setData({
        notice: res.data
      })
    })
  },

  bindTitle(e){
    this.setData({
      title: e.detail.value
    })
    this.getShares(true)
  }

 
})