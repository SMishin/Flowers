import HttpClient from '../../core/http-client';

class OrdersService {

	constructor(http) {
		this._http = http;
		this._url = '/api/orders';
	}

	get(id) {

		if (id) {
			return this._http.get(this._url + '/' + id);
		}

		return this._http.get(this._url + 's');
	}

	save(data, options) {
		return this._http.post(this._url, data, options);
	}

	remove(id, options) {
		return this._http.delete(this._url + '?id=' + id, options);
	}
}

OrdersService.parameters = [
	HttpClient
];

export default OrdersService;