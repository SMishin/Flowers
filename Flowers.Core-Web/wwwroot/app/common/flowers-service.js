import HttpClient from '../core/http-client';

class FlowersService {

	constructor(http) {
		this._http = http || new HttpClient();
		this._url = '/api/products/flower';
	}

	get(filter) {

		if (filter && filter.id !== void 0) {
			return this._http.get(this._url + '/' + filter.id);
		}

		return this._http.get(this._url + 's' + (filter !== void 0 && filter !== null ? filter.toQueryString() : ''));
	}

	getPublished(filter) {

		if (filter.id) {
			return this._http.get(this._url + '/' + id);
		}

		return this._http.get(this._url + 's/published' + filter.toQueryString());
	}

	save(data, options) {
		return this._http.post(this._url, data, options);
	}

	remove(id, options) {
		return this._http.delete(this._url + '?id=' + id, options);
	}
}

FlowersService.parameters = [
	HttpClient
];

export default FlowersService;