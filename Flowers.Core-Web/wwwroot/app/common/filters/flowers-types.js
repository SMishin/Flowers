import  Filter from './filter'

export default class FlowersTypesFilter extends Filter {
	constructor(data) {
		super(data);
		this.types = this.types === void 0 ? [] : this.types;
	}

	static get _name() {
		return "flowersTypes";
	}

	toQueryString() {
		let qString = '';

		if (this.types && this.types.length > 0) {
			qString += 'ft=' + this.types.reduce(function (prev, current) {
					return `${prev},${current}`;
				})
		}

		return qString;
	}
}