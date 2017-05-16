import HttpClient from '../core/http-client';
import ProductsFilter from './products-filter';

class ProductsService {

	constructor(http) {
		this._http = http || new HttpClient();
		this._url = '/api/product';
	}

	get(filter) {

		if (filter.id) {
			return this._http.get(this._url + '/' + filter.id);
		}

		return this._http.get(this._url + 's/' + (filter instanceof ProductsFilter ? filter.toQueryString() : new ProductsFilter(filter).toQueryString()));
	}

	getPublished(filter) {
		return this._http.get(this._url + 's/published' + filter.toQueryString());
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