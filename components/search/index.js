// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js';
import { BookModel } from '../../models/book.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

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
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    words: '',
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
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
      const words = e.detail.value || e.detail.text;
      this.setData({
        searching: true,
        words
      });
      
      bookModel.search(0, words).then(res => {
        this.setData({
          dataArray: res.books
        })
        keywordModel.addToHistory(words);
      })
    },

    // 清除按钮
    onDelete(e) {
      this.setData({
        searching: false,
        dataArray: [],
        words: ''
      });
    },
  }
})
