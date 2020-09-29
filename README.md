

# 知识分享项目

## 一、起步

### 1、新建项目

### 2、删除自带的log和index页面文件夹（`app.json`中的相关页面配置文件也要去除），并且在根目录下新建image文件夹

### 3、新建导航主页面（3个——首页、应用、我的），修改页面样式配置

`app.json`中添加

![](https://swl-kuzma.oss-cn-beijing.aliyuncs.com/markdown/20200928145705.png)

**点击编译即可，效果如下所示：**

![image-20200928145953092](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20200928145953092.png)

### 4、底部导航栏等配置

* 收集图标存放在image目录下，每个图标两种颜色一个选中情况下、一个未选中情况下

* 在`app.json`中添加配置

  ```json
  "tabBar": {
      "color": "#000000",
      "selectedColor": "#FF4444",
      "backgroundColor": "#fffff",
      "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "image/icon_shouye.png",
        "selectedIconPath": "image/icon_shouye_active.png"
      },
      {
        "pagePath": "pages/application/application",
        "text": "应用",
        "iconPath": "image/icon_yingyong.png",
        "selectedIconPath": "image/icon_yingyong_active.png"
      },
      {
        "pagePath": "pages/personal/personal",
        "text": "我的",
        "iconPath": "image/icon_wode.png",
        "selectedIconPath": "image/icon_wode_active.png"
      }
    ]
  ```

* 修改每个页面顶部的文字内容，以后新建文件，一样修改

  方法：在每个页面文件的`josn`文件中添加`navigationBarTitleText`属性

  ![](https://swl-kuzma.oss-cn-beijing.aliyuncs.com/markdown/20200928164727.png)

## 二、后端数据获取请求——在微服务的基础上

### 1、添加链接数据库配置

```yml
  datasource:
    url: jdbc:mysql://101.200.82.237:3306/content_center?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
    username: root
    password: abc.123
    hikari:
      max-lifetime: 30000
      minimum-idle: 1
      maximum-pool-size: 20
      auto-commit: true
      idle-timeout: 10000
      connection-timeout: 30000
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
```



### 2、添加`tkmybatis`等依赖

```xml
        <dependency>
            <groupId>tk.mybatis</groupId>
            <artifactId>mapper-spring-boot-starter</artifactId>
            <version>2.1.5</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
```

### 3、参照之前课程实例编写一个查询所有分享的接口

**测试接口**

![](https://swl-kuzma.oss-cn-beijing.aliyuncs.com/markdown/20200928222036.png)

***注：调用接口的时候先将开发者工具中的不校验合法域名开启***

## 三、编写前端代码

### 1、首页——index

1. **`index.wxml`**

   ```vue
   <!--pages/index/index.wxml-->
   <view class="container">
   
   <!-- tab -->
   <view class="tab">
   <view class="tab-item {{tab==0? 'active':''}}" data-tab="0" bindtap="changeTab">发现</view>
   <view class="tab-item {{tab==1? 'active':''}}" data-tab="1" bindtap="changeTab">使用说明</view>
   </view>
   
   <!-- tab1 -->
   <view class="share-list" wx:if="{{tab==0}}">
   <view wx:for="{{shareList}}" wx:for-item="share" class="share-item">
   <view wx:if="{{share.isOriginal==0}}" class="origin-label {{share.isOriginal==0? 'one':'two'}}">原创</view>
   <view wx:else class="origin-label {{share.isOriginal==0? 'one':'two'}}">转载</view>
   <image src="{{share.cover}}"></image>
   <view class="item-main" data-item="{{share}}" bindtap="goDetail">
   <text class="item-title">{{share.title}}</text>
   <text class="item-summary">{{share.title}}</text>
   </view>
   <view class="item-duihuan">
   <text>{{share.price}}积分</text>
   <text data-item="{{share}}" bindtap="duihuan">兑换</text>
   </view>
   </view>
   </view>
   
   <!-- tab2 -->
   <view wx:else class="dicription">
   <text>资源均为免费,段焕后即可查看下载地址：点击我的->我的兑换，即可查看，下载兑换过的资源。</text>
   
   <view>
   <text class="dicription-title">获得积分的方式</text>
   <view>> 每日签到</view>
   <view>> 投稿</view>
   <view>> 转发</view>
   <view>> 提建议、意见</view>
   </view>
   
   <view>
   <text class="dicription-title">深入交流</text>
   <view>> 技术交流QQ群：731548893</view>
   <view>> 技术交流微信群：叫我微信，注明加微信群</view>
   <view>> 私人微信：jumping_me</view>
   </view>
   
   <view>
   <text class="dicription-title">公众号（技术干活分享</text>
   <view>> 技术交流QQ群：731548893</view>
   <view>> 技术交流微信群：叫我微信，注明加微信群</view>
   <view>> 私人微信：jumping_me</view>
   </view>
   
   
   </view>
   
   </view>
   ```

2. **`index.wxss`**

   ```css
   /* pages/index/index.wxss */
   .container{
     display: flex;
     align-items: flex-start;
     justify-content: flex-start;
     padding: 10rpx;
   }
   
   .tab{
     position: sticky;
     top: 0;
     display: flex;
     align-content: center;
     justify-content: space-around;
     width: 100%;
     padding: 10rpx;
     color: gray;
     background-color: #fff;
     z-index: 1000;
   }
   
   .tab-item{
     width: 30%;
     padding: 10rpx;
     display: flex;
     justify-content: center;
     align-items: center;
   }
   
   .tab-item.active{
     color: #000;
     font-weight: 530;
     border-bottom: 5rpx solid;
     border-bottom-color: #FF4444;
   }
   
   .share-item{
     display: flex;
     width: 100%;
     height: 200rpx;
     padding: 10rpx;
     align-items: center;
     position: relative;
     border-bottom: 1rpx  dashed gray;
   }
   
   .share-item image{
     flex: 0 0 18%;
     width: 140rpx;
     height: 140rpx;
     border-radius: 50%;
   }
   
   
   .origin-label{
     position: absolute;
     top: 10%;
     display: flex;
     color: #fff;
     flex-wrap: nowrap;
     font-size: 30rpx;
     padding: 5rpx;
   }
   
   .origin-label.one{
     background-color: #FF4444;
   }
   
   .origin-label.two{
     background-color: rgb(132, 189, 0);
   }
   
   .item-main{
     flex: 0 0 60%;
     display: flex;
     flex-direction: column;
     padding: 20rpx;
   }
   
   .item-title{
     font-weight: 650;
     font-size: 30rpx;
   }
   
   .item-summary{
     font-weight: 500;
     font-size: 30rpx;
   }
   
   .item-duihuan{
     /* flex: 0 0 10%; */
     display: flex;
     flex-direction: column;
     font-size: 30rpx;
   }
   
   .dicription{
     font-size: 32rpx;
     padding: 20rpx;
   }
   
   .dicription-title{
     font-weight: 600;
   }
   
   ```

3. **`index.js`**

   ```js
   // pages/index/index.js
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       tab: 0,
       shareList:null
     },
   
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
       var that = this
       wx.request({
         url: 'http://localhost:8081/share/all',
         success:function(res){
           // console.log(res)
           that.setData({
             shareList: res.data
           })
           console.log(that.data.shareList)
         }
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
      * 切换tab
      */
     changeTab(e){
       this.setData({
         tab:e.currentTarget.dataset.tab
       })
     },
   
     /**
      * 前往详情页
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
      * 兑换
      */
     goDetail(e){
       //取出绑定对象
       console.log(e)
       var share = e.currentTarget.dataset.item
       wx.navigateTo({
         url: '../shareDetail/shareDetail?share='+JSON.stringify(share),
       })
     }
   })
   ```

   * 点击兑换跳转兑换成功页面

### 2.详情页——`shareDetail`

1. `shareDetail.wxml`

   ```vue
   <view class="container">
   <text class="title">{{share.title}}</text>
   <text>作者：{{share.author}}</text>
   
   <view class="summary">
   <text>{{share.summary}}</text>
   </view>
   
   <view class="duihuan">
   <text>积分：</text>
   <text class="price">$ {{share.price}}</text>
   <text class="btn" data-item="{{share}}" bindtap="duihuan">兑换</text>
   </view>
   
   </view>
   ```

2. `shareDetail.js`

   ```js
   // pages/duihuanSuccess/duihuanSuccess.js
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
     duihuan(e){
       //取出绑定对象
       console.log(e)
       var share = e.currentTarget.dataset.item
       wx.navigateTo({
         url: '../duihuanSuccess/duihuanSuccess?share='+JSON.stringify(share),
       })
     },
   })
   ```

### 2、兑换成功页——`duihuanSuccess`

**`duihuanSuccess.js`**

`onLoad()`方法获取上个页面传递过来的实体，在现页面使用

![](https://swl-kuzma.oss-cn-beijing.aliyuncs.com/markdown/20200928224331.png)

### 3、投稿页面——`tougao`

1. **`tougao.wxml`**

   ```vue
   <!--pages/tougao/tougao.wxml-->
   <view class="container">
   
   <text class="description">说明：投稿审核通过会有积分奖励：资源被下载会有积分奖励；提交的资源不得包含广告、侵权信息，百度盘地址建议有密码。</text>
   <view class="label-list">
   
   <radio-group bindchange="radioChange">
   <view class="is-original-item">
   <text>原创</text>
   <view>
   <radio value="0" checked="{{isOriginal==0}}"/>
   </view>
   </view>
   <view class="is-original-item">
   <text>转载</text>
   <view>
   <radio value="1" checked="{{isOriginal==1}}"/>
   </view>
   </view>
   
   </radio-group>
   
   <view class="label">
   <text>标题</text>
   <input placeholder="请输入标题"></input>
   </view>
   <view class="label">
   <text>作者</text>
   <input placeholder="请输入作者"></input>
   </view>
   <view class="label">
   <text>价格</text>
   <input placeholder="请输入价格"></input>
   </view>
   <view class="label">
   <text>简介</text>
   <input placeholder="介绍一下技术干货吧"></input>
   </view>
   <view class="label">
   <text>下载地址</text>
   <input placeholder="请输入下载地址"></input>
   </view>
   
   </view>
   
   <button class="btn">提交</button>
   
   </view>
   ```

2. **`tougao.wxss`**

   ```css
   /* pages/tougao/tougao.wxss */
   .container{
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     padding: 20rpx;
   }
   
   .description{
     font-size: 30rpx;
     font-weight: 550;
   }
   
   .label-list{
     display: flex;
     flex-direction: column;
     margin: 5rpx;
     margin-top: 20rpx;
     width: 100%;
     font-size: 35rpx;
   }
   
   .label{
     display: flex;
     justify-content: space-between;
     align-content: space-between;
     width: 100%;
     margin-bottom: 20rpx;
   }
   
   .label input{
     width: 70%;
   }
   
   .btn{
     background-color: #FF4444;
     color: #fff;
     margin-top: 20rpx;
   }
   
   .is-original-item{
     display: flex;
     justify-content: space-between;
     font-size: 32rpx;
     margin-top: 30rpx;
     margin-bottom: 20rpx;
   }
   ```

3. **`tougao.js`**

   ```js
    radioChange(e) {
       console.log('radio发生change事件，携带value值为：', e.detail.value)
     },
   ```

### 4、我的界面

- 先在`app.js`中存放`user`和`userInfo`两个对象用于存储登录状态，后续可以采用token代替

  ```js
    globalData: {
      userInfo: null,
      user:{
        name:'吃不饱',
        cover:'https://avatars1.githubusercontent.com/u/55436087?s=60&v=4',
        bonus: 200
      }
    }
  ```

- 未登录状态

  ```vue
  <!-- 未登录 -->
  <view class="no-user" wx:if="{{userInfo === null}}">
  <image src="../../image/yonghu.png"></image>
  <view>登录,享受技术之旅吧!</view>
  <button class="btn" bindtap="weixinLogin">微信登录</button>
  </view>
  ```

- 去登录

  ```js
    /**
     * 登录，目前只是走个形式
     */
    weixinLogin(){
      app.globalData.userInfo = app.globalData.user
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }
  ```

- 已登录

  ```vue
  <!-- 已登录 -->
  <view class="my-info" wx:else>
  <view class="user">
  <image src="{{userInfo.cover}}"></image>
  <text>{{userInfo.name}}</text>
  <text>积分:{{userInfo.bonus}}</text>
  <view class="qiandao">签到</view>
  </view>
  <view class="my-manage">
  <view class="manage-item">我的兑换</view>
  <view class="manage-item">积分明细</view>
  <view class="manage-item">我的投稿</view>
  </view>
  </view>
  ```

**详细代码已经推到`github`**

[项目git地址](https://github.com/Kuzma77/share-app-weixin)

