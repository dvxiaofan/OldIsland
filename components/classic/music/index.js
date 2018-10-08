// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js';


const mManager = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: './images/player@pause.png',
    playSrc: './images/player@play.png',
  },
  // 组件实例进入页面节点树时执行
  attached: function () {
    this._recoverStatus();
    // 监听主控事件
    this._monitorSwitch();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (e) {
      // 图片要切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
  
        mManager.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        })
        mManager.pause();
      }

    },

    _recoverStatus: function () {
      if (mManager.paused) {
        this.setData({
          playing:false
        })
        return;
      }
      if (mManager.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mManager.onPlay(() => {
        this._recoverStatus();
      })

      mManager.onPause(() => {
        this._recoverStatus();
      })

      mManager.onStop(() => {
        this._recoverStatus();
      })

      mManager.onEnded(() => {
        this._recoverStatus();
      })
    }

  }
})
