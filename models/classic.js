import { HTTP } from '../utils/http.js';

class ClassicModel extends HTTP {
	getLatest(sCallBack) {
		this.request({
      url: 'classic/latest',
      success: res => {
        sCallBack(res);
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      }
    })
  }
  
  getClassicData(index, nextOrPrev, sCallBack) {
    // 查看缓存中是否存在数据，如有，就不加载
    let key = nextOrPrev == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrev,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallBack(res);
        }
      })
    } else {
      sCallBack(classic);
    }
  }

  isFirst(index) {
    return index == 1 ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false;
  }

  // 缓存最新一期的index
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }

  // 读取缓存中的index
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index;
  }

  // 设定一个缓存key
  _getKey(index) {
    let key = 'classic-' + index;
    return key;
  }
}


export { ClassicModel };