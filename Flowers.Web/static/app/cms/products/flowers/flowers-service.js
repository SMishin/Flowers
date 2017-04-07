import {Injectable} from '@angular/core';
import HttpClient from '../../core/http-client';

@Injectable()
class FlowersService {

	constructor(http) {
		this._http = http;
		this._url = '/api/products/flower';
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

FlowersService.parameters = [
	HttpClient
];

export default FlowersService;