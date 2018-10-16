// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js';

const keywordModel = new KeywordModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: []
  },

  attached() {
    const historyWords = keywordModel.getHistory();
    this.setData({
      historyWords
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e) {
      this.triggerEvent('onCancel', {}, {});
    },

    onConfirm(e) {
      const words = e.detail.value;
      keywordModel.addToHistory(words);
    },

    onDelete(e) {
      console.log('delete')
    },

    onTap(e) {
      console.log(e.detail.text)
    },
  }
})
