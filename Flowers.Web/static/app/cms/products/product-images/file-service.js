import {Injectable} from '@angular/core';
import HttpClient from '../../core/http-client';

@Injectable()
class FileService {
	constructor(http) {
		this._http = http;
		this._url = '/api/products';
	}

	upload(id, data, options) {
		return this._http.put(this._url + '/' + id + '/image', data, options);
	}

	remove(id, options) {
		return this._http.delete(this._url + '?id=' + id, options);
	}
}

FileService.parameters = [
	HttpClient
];

export default FileService;