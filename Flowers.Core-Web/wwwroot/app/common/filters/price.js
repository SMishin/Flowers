import  Filter from './filter'

export default class PriceFilter extends Filter {
	constructor(data) {
		super(data);
		this.from = (this.from === void 0 || this.from === null) ? '' : this.from;
		this.to = (this.to === void 0 || this.to === null) ? '' : this.to;
	}

	get _name() {
		return PriceFilter._name;
	}

	static get _name() {
		return "price";
	}

	toQueryString() {
		let qString = '';

		if (this.from || this.to) {
			qString += 'p=' + (this.from || 0) + (this.to ? (',' + this.to) : '');
		}

		return qString;
	}
}