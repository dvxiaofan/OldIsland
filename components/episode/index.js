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

  attached: function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    this.setData({
      year: year,
      month: this.data.months[month]
    })
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
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
