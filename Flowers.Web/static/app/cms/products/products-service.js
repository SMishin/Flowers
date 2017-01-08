import {Injectable} from '@angular/core';
import HttpClient from '../core/http-client';

@Injectable()
class ProductsService {

	constructor(http) {
		this._http = http;
		this._url = '/api/product';
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

ProductsService.parameters = [
	HttpClient
];

export default ProductsService;