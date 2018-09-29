import { HTTP } from '../utils/http.js';

class ClassicModel extends HTTP {
	getLatest(sClassicBack) {
		this.request({
      url: 'classic/latest',
      success: res => {
        sClassicBack(res);
      }
    })
  }
  
  getPrevious(index, sClassicBack) {
    this.request({
      url: 'classic/' + index + '/previous',
      success: res => {
        sClassicBack(res);
      }
    })
  }
}


export { ClassicModel };