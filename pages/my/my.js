// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAvatared();

  },

  userAvatared() {
    wx.getSetting({
      success: (result)=>{
        if (result.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                authorized: true,
                userInfo: res.userInfo,
              })
            }
          })
        } else {
          console.log('error')
        }
      }
    });
  },
  
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo,
      })
    }
  },
})