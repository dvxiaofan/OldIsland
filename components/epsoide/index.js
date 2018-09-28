// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      // observer: function (newVal, oldVal, changedPath) {
      //   let val = newVal < 10 ? '0' + newVal : newVal;
      //   // 不能在observer里修改自身属性， 因为observer 本身就是监测数据变化，setData后会再次调用observer，会出现无限递归现象
      //   this.setData({
      //     _index: val
      //   })        
      // }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '',
    // _index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
