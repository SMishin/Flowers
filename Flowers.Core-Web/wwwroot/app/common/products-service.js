import HttpClient from '../core/http-client';
import ProductTypeFilter from './filters/product-type';

class ProductsService {

	constructor(http) {
		this._http = http || new HttpClient();
		this._url = '/api/product';
	}

	get(filter) {

		if (filter.id) {
			return this._http.get(this._url + '/' + filter.id);
		}

		return this._http.get(this._url + 's/?' + (filter instanceof ProductTypeFilter ? filter.toQueryString() : new ProductTypeFilter(filter).toQueryString()));
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