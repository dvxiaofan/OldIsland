import { HTTP } from '../utils/http.js';

class ClassicModel extends HTTP {
	getLatest(sCallback) {
		this.request({
      url: 'classic/latest',
      success: res => {
        sCallback(res);
        this._setLatestIndex(res.index);
        const key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      }
    })
  }
  
  getClassicData(index, nextOrPrev, sCallback) {
    // 查看缓存中是否存在数据，如有，就不加载
    const key = nextOrPrev == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    const classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrev}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res);
        }
      })
    } else {
      sCallback(classic);
    }
  }

  isFirst(index) {
    return index == 1 ? true : false;
  }

  isLatest(index) {
    const latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false;
  }

  // 缓存最新一期的index
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }

  // 读取缓存中的index
  _getLatestIndex() {
    const index = wx.getStorageSync('latest');
    return index;
  }

  // 设定一个缓存key
  _getKey(index) {
    const key = 'classic-' + index;
    return key;
  }
}


export { ClassicModel };