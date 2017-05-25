import  Filter from './filter'

export default class BouquetsTypesFilter extends Filter {
	constructor(data) {
		super(data);
		this.types = this.types === void 0 ? [] : this.types;
	}

	static get _name() {
		return "bouquetsTypes";
	}

	toQueryString() {
		let qString = '';

		if (this.types && this.types.length > 0) {
			qString += 'bt=' + this.types.reduce(function (prev, current) {
					return `${prev},${current}`;
				})
		}

		return qString;
	}
}