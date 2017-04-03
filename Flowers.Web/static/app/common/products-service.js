import HttpClient from '../core/http-client';

class ProductsService {

	constructor(http) {
		this._http = http;
		this._url = '/api/products/flower';
	}

	get(filter) {

		if (filter.id) {
			return this._http.get(this._url + '/' + id);
		}

		let qString = '';

		if (filter.types && filter.types.length > 0) {
			qString += '?ft=' + filter.types.reduce(function (prev, current) {
					return `${prev},${current}`;
				})
		}

		if (filter.page) {
			qString += `${qString === '' ? '?' : '&'}page=${filter.page}`;
		}

		return this._http.get(this._url + 's/published' + qString);
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