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
    pageSize:10,
    more: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyContribute(true)
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
    this.getMyContribute(true)
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
        this.getMyContribute(true)
  },

  /**
   * 页面上拉触底事件的处理函数
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
    this.getMyContribute()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   /**
   * 详情
   */
  goDetail(e){
    //取出绑定对象
    console.log(e)
    var share = e.currentTarget.dataset.item
    if(share.auditStatus == 'PASSED'){
      wx.navigateTo({
        url: '../duihuanSuccess/duihuanSuccess?share='+JSON.stringify(share),
      })
    }
    else{
      share['updateStatus'] = true
      wx.reLaunch({
        url: '../tougao/tougao?share='+JSON.stringify(share),
      })
    }
  },

  /**
   * 获取我的投稿数据
   * @param {boolean} init 
   */
  getMyContribute(init){
    var that = this
    if(init){
      that.setData({
        pageNo:1,
        more:true
      })
    }
     API.getMyShares({
      pageNo:that.data.pageNo,
      pageSize:that.data.pageSize,
      userId:app.globalData.user.id
    }).then(res =>{
    if(init){
      that.setData({
        shareList:res.data.reverse()
      })
    }else{
      that.setData({
        shareList:that.data.shareList.concat(res.data.reserve())
      })
    }
    if(res.data.length < that.data.pageSize&&that.data.pageNo>0){
      that.setData({
        more:false
      })
    }
    })
  }

})