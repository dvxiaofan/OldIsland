// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js';

import {
  BookModel
} from '../../models/book.js';

import {
  paginationBev
} from '../../components/behaviors/pagination.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  behaviors: [
    paginationBev
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_load_more',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    words: '',
    loading: false,
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
        words,
      });

      // 先清除上次数据
      this.initialize();
      
      bookModel.search(0, words).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(words);
      })
    },
    // 清除按钮
    onDelete(e) {
      this.setData({
        searching: false,
        words: ''
      });
    },

    _load_more(e) {
      if (!this.data.words) return ;

      if (this.data.loading) return;

      
      if (this.hasMore()) {
        // 正在加载数据
        this.data.loading = true;
        bookModel.search(this.getCurrentStart(), this.data.words).then(res => {
          this.setMoreData(res.books);
          
          this.data.loading = false;
        })
      }
    },
  }
})
