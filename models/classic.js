import { HTTP } from '../utils/http.js';

class ClassicModel extends HTTP {
	getLatest(sCallBack) {
		this.request({
      url: 'classic/latest',
      success: res => {
        sCallBack(res);
        this._setLatestIndex(res.index);
      }
    })
  }
  
  getClassicData(index, nextOrPrev, sCallBack) {
    this.request({
      url: 'classic/' + index + '/' + nextOrPrev,
      success: res => {
        sCallBack(res);
      }
    })
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
}


export { ClassicModel };