// pages/shareDetail/shareDetail.js
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
    console.log(options)
    this.setData({
      share:JSON.parse(options.share)
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
   * 复制下载链接方法
   */
  copy(){
    console.log('111')
    console.log(this.validateGet(this.data.share.downloadUrl))
    wx.setClipboardData({
      data: this.validateGet(this.data.share.downloadUrl),
      success:function(){
        wx.showToast({
          title: '下载链接已复制',
        })
      }
    })
  },
  /**
   * 正则提取
   */
  validateGet(string){
    var urlReg = '^(f|ht){1}(tp|tps):\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?'
    return string.match(urlReg)[0]
  }
})