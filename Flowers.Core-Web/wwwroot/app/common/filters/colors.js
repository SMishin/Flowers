import  Filter from './filter'

export default class ColorsFilter extends Filter {
	constructor(data) {
		super(data);
		this.colors = this.colors === void 0 ? [] : this.colors;
	}

	get _name() {
		return ColorsFilter._name;
	}

	static get _name() {
		return "colors";
	}

	toQueryString() {
		let qString = '';

		if (this.colors !== void 0 && this.colors.length > 0) {
			qString += 'c=' + this.colors.reduce(function (prev, current) {
					return `${prev},${current}`;
				})
		}

		return qString.replace(/#/g, '');
	}
}