//app.js
App({
  onLaunch: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    var tabbar = this.globalData.tabBar;
    var currentPages = getCurrentPages();
    var that = currentPages[currentPages.length - 1];
    var pagePath = that.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    that.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null,//客户端设备信息
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "icon/discover.png",
          "selectedIconPath": "icon/discover1.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/classify/classify",
          "iconPath": "icon/favorite.png",
          "selectedIconPath": "icon/favorite1.png",
          "text": "分类"
        },
        {
          // 中间按钮不进行页面跳转，直接在当前页面显示发帖编辑页面
          "pagePath": "",
          "iconPath": "icon/add.png",
          "isSpecial": true,
          "text": ""
        },
        {
          "pagePath": "/pages/car/car",
          "iconPath": "icon/bell.png",
          "selectedIconPath": "icon/bell1.png",
          "text": "通知"
        },
        {
          "pagePath": "/pages/mine/mine",
          "iconPath": "icon/profile.png",
          "selectedIconPath": "icon/profile1.png",
          "text": "我的"
        }
      ]
    }
  }
})