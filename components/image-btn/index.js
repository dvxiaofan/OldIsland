// components/image-btn/index.js
Component({

  options: {
    multipleSlots: true    // 开启插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    openType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(e) {
      this.triggerEvent('getUserData', e.detail, {})
    }
  }
})
