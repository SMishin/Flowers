import HttpClient from '../core/http-client';

class ProductsService {

	constructor(http) {
		this._http = http;
		this._url = '/api/products/flower';
	}

	get(page) {

		// if (id) {
		// 	return this._http.get(this._url + '/' + id);
		// }

		return this._http.get(this._url + 's/published?page=' + page);
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