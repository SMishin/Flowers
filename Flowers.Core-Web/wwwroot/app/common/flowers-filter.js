export default class FlowersTypesFilter {
	constructor(data) {

		this.types = [];

		if (data) {
			for (let prop in data) {
				this[prop] = data[prop];
			}
		}

	}


	toQueryString() {
		let qString = '';

		if (this.types && this.types.length > 0) {
			qString += '?filter=' + this.types.reduce(function (prev, current) {
					return `${prev},${current}`;
				})
		}

		if (this.page) {
			qString += `${qString === '' ? '?' : '&'}page=${this.page}`;
		}

		return qString;
	}
}