import  Filter from './filter'

export default class ProductTypeFilter extends Filter {
	constructor(data) {
		super(data);
	}

	static get _name() {
		return 'productType';
	}

	toQueryString() {
		let qString = '';
		this.type !== void 0 && (qString += 'pt=' + this.type);
		return qString;
	}
}