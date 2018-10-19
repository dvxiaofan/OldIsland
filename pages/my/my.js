// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic.js';

import {
  BookModel
} from '../../models/book.js';

const classicModel = new ClassicModel();
const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    likeBookCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAvatared();

    this.getLikeCount();
  },

  getLikeCount(e) {
    bookModel.getLikeBookCount().then(res => {
      this.setData({
        likeBookCount: res.count
      })
      
    })
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

  onJumpToAbout(e) {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  onStudy(e) {
    wx.navigateTo({
      url: '../course/course',
    })
  },

})