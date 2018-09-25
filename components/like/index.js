// components/li'ke/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    notSrc: './images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(e) {
      console.log(e);
      
    }
  }
})
