import { config } from '../config.js';

class HTTP {
	request(params) {
		if (!params.method) {
			params.method = 'GET'
		}
		wx.request({
			url: config.api_base_url + params.url,
			data: params.data,
			method: params.method,
			header: {
				'content-type': 'application/json',
				'appkey': config.appkey
			}, 
			success: (res) =>{
				let code = res.statusCode.toString();				
				if (code.startsWith('2')) {
					console.log('success');
				} else {
					console.log('nononono')
				}
			},
			fail: (err) => {
				// fail
			}
		})
	}
}


export { HTTP }