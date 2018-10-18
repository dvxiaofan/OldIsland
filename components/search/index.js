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
      observer: 'loadMore',
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
    loadingCenter: false,
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
      this._showLoadingCenter();

      const words = e.detail.value || e.detail.text;      
      this._showResult(words);

      // 先清除上次数据
      this.initialize();
      
      bookModel.search(0, words).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(words);
        this._hideLoadingCenter();
      })
    },

    // 清除按钮
    onDelete(e) {
      this._closeResult();
    },

    loadMore(e) {
      if (!this.data.words) return ;
      if (this._isLocked()) return;
      
      if (this.hasMore()) {
        // 正在加载数据
        this._locked();
        bookModel.search(this.getCurrentStart(), this.data.words).then(res => {
          this.setMoreData(res.books);
          this._unLocked();
        }, () => {
          // 请求失败的时候也要解锁
          this._unLocked();
        })
      }
    },

    _showResult(words) {
      this.setData({
        searching: true,
        words,
      });
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        words: '',
      })
    },

    _isLocked() {
      return this.data.loading ? true : false;
    },

    _locked() {
      this.setData({
        loading: true
      });
    },

    _unLocked() {
      this.setData({
        loading: false
      });
    }
  }
})
