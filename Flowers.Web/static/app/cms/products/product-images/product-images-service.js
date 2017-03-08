import {Injectable} from '@angular/core';
import HttpClient from '../../core/http-client';

@Injectable()
class ProductImagesService {
	constructor(http) {
		this._http = http;
		this._url = '/api/product';
	}

	get(id){
		return this._http.get(this._url + '/' + id + '/images');
	}

	upload(id, data, options) {
		return this._http.put(this._url + '/' + id + '/image', data, options);
	}

	remove(id, options) {
		return this._http.delete(this._url + '/image?id=' + id, options);
	}
}

ProductImagesService.parameters = [
	HttpClient
];

export default ProductImagesService;