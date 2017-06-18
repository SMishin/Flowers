import HttpClient from '../core/http-client';

class BouquetsService {

	constructor(http) {
		this._http = http || new HttpClient();
		this._url = '/api/products/bouquet';
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

	async addFlower(data, options) {
		 return await this._http.put(`${this._url}/${data.id}/flowers?flowerId=${data.flowerId}`, options);
	}

	async removeFlower(data, options) {
		return await this._http.delete(`${this._url}/${data.id}/flowers?flowerId=${data.flowerId}`, options);
	}

	async getFlowers(id, options){
		return await this._http.get(`${this._url}/${id}/flowers`, options);
	}

	remove(id, options) {
		return this._http.delete(this._url + '?id=' + id, options);
	}
}

BouquetsService.parameters = [
	HttpClient
];

export default BouquetsService;