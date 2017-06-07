import  Filter from './filter'

export default class PriceFilter extends Filter {
	constructor(data) {
		super(data);
		this.colors = this.colors === void 0 ? [] : this.colors;
	}

	get _name() {
		return PriceFilter._name;
	}

	static get _name() {
		return "price";
	}

	toQueryString() {
		let qString = '';

		if (this.colors !== void 0 && this.colors.length > 0) {
			qString += 'p=' + this.colors.reduce(function (prev, current) {
					return `${prev},${current}`;
				})
		}

		return qString.replace(/#/g, '');
	}
}