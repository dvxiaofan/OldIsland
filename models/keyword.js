
import {
	HTTP
} from '../utils/http-p.js';

class KeywordModel {
	key = 'q';
	maxLength = 10;

	// 获取历史搜索
	getHistory() {
		const words = wx.getStorageSync(this.key);
		if (!words) return [];
		return words;
	}

	// 获取热门搜索
	getHot() {}

	// 添加到历史搜索
	addToHistory(keyword) {
		let words = this.getHistory();
		const hasKeyword = words.includes(keyword);
		if (!hasKeyword) {
			const length = words.length;
			// 只留前十个历史记录
			if (length >= this.maxLength) {
				words.pop();
			}
			words.unshift(keyword);
			wx.setStorageSync(this.key, words);
		}
	}
};



export { KeywordModel };