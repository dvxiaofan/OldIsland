import { HTTP } from '../utils/http.js';

class ClassicModel extends HTTP {
	getLatest(sClassicBack) {
		this.request({
      url: 'classic/latest',
      success: (res) => {
        sClassicBack(res);
      }
    })
	}
}


export { ClassicModel };