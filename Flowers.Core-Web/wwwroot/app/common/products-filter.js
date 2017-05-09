export default class ProductsFilter {
	constructor(data) {

		if (data) {
			for (let prop in data) {
				this[prop] = data[prop];
			}
		}
	}

	toQueryString() {
		let qString = '';

		this.type !== void 0 && (qString += '?type=' + this.type);
		this.page !== void 0 && (qString += `${qString === '' ? '?' : '&'}page=${this.page}`);

		return qString;
	}
}