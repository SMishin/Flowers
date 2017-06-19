import {Injectable} from '@angular/core';
import HttpClient from '../../core/http-client';

@Injectable()
class FlowersTypesService {

	constructor(http) {
		this._http = http;
		this._url = '/api/flowers-type';
	}

	async get(id) {

		if (id) {
			return await this._http.get(this._url + '/' + id);
		}

		return await this._http.get(this._url + 's');
	}

	async save(data, options) {
		return await this._http.post(this._url, data, options);
	}

	remove(id, options) {
		return this._http.delete(this._url + '?id=' + id, options);
	}
}

FlowersTypesService.parameters = [
	HttpClient
];

export default FlowersTypesService;