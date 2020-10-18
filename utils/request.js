//统一接口封装
const API_BASE_URL = 'http://localhost:8040';
const app = getApp()

const get = (url,data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: "正在加载中...",
    })
    console.log(_url)
    wx.request({
      url: _url,
      method: 'GET',
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Token': app.globalData.token==null? 'no-token':app.globalData.token
      },
      success(request) {
        console.log(request)
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
 const post = (url, data,contentType) => {
  let _url = API_BASE_URL  + url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
    break;
    case "json" : 
      var headerObj = {'content-type' : 'application/json'};
    break;
    default :
      var headerObj = {'content-type' : 'application/json'};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "POST",
      dataType : JSON,
      header: headerObj,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}

module.exports ={
  login:(data) =>{
    console.log("登录")
    return post('/user/login',data,'json') //微信登录
  },
  getShares:(data) =>{
    console.log('获取分享列表')
    return get('/share/query',data)//获取分享列表
  },
  getNotic:() =>{
    console.log('获取最新公告')
    return get('/notice/one') //获取最新公告
  },
  getMyShares:(data) =>{
    console.log("获取我的投稿")
    return get('/share/query/contribution',data) //获取我的投稿
  },
  exchange:(data)=>{
    console.log("兑换分享")
    return post("/share/exchange",data) //兑换分享
  },
  update:(data)=>{
    console.log("刷新用户信息")
    return get("/user",data)//刷新用户信息
  },
  getMyExchange:(data) =>{
    console.log("获取我的兑换")
    return get("/share/query/exchange",data) //获取我的兑换
  },
  getMyBonusLog:(data) =>{
    console.log("获取我的积分明细")
    return get("/log",data)//获取我的积分明细
  },
  contribution:(data) =>{
    console.log("投稿")
    return post("/share/contribute",data)//投稿
  },
  updateContribution:(data) =>{
    console.log("编辑投稿")
    return post("/share/update/contribute",data) //编辑投稿
  },
  getNotYetShares:() =>{
    console.log("获取未通过审核分享")
    return get("/share/query/notYet")//获取未通过审核分享
  },
  
  updateAuditStatus:(data) =>{
    console.log('通过审核')
    return post('/admin/shares/audit',data)//通过审核
  }
}