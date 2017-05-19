import 'whatwg-fetch';
import merge from './merge';

class HttpClient {
	constructor() {
	}
}

function addMethods(methods, withData) {
	let i = methods.length
		;

	function request(url, requestOptions) {

		return fetch(url, requestOptions)
			.then(response => {

				console.log(response);

				if (!response.ok) {
					return response.json()
						.then(body => {

							throw {
								error: body,
								response: response
							};

						});
				}

				return response;
			})
			.then(response => {
				let ct = response.headers.get("Content-Type");

				if (ct && ct.indexOf('application/json') !== -1) {
					return response.json();
				}

				return response.text();
			})
			.catch(response=> {
				//console.log(response);

				if (response.response) {
					throw response;
				}

				response.status = 404;

				throw {
					response: response
				};

			});

	}

	function getMethodRequest(method) {

		function createDefaultRequestOptions(config) {
			config = config || {};

			let options = {
				mode: 'cors',
				method: method,
				credentials: 'include',
				headers: {}
			};

			return merge(options, config);

		}

		if (withData == true) {

			return function (url, data, config) {

				let requestOptions = createDefaultRequestOptions(config);

				if (!(data instanceof FormData) && typeof data === 'object') {
					data = JSON.stringify(data);
					requestOptions.headers['Content-Type'] = 'application/json';
				}

				requestOptions.body = data;

				return request(url, requestOptions);
			}

		}

		return function (url, config) {

			let requestOptions = createDefaultRequestOptions(config);
			return request(url, requestOptions);
		}
	}

	while (i--) {
		HttpClient.prototype[methods[i]] = getMethodRequest(methods[i]);
	}
}

addMethods(['delete', 'get'], false);
addMethods(['post', 'put'], true);

export default HttpClient;