import  Filter from './filter'

export default class PageFilter extends Filter {
	constructor(data) {
		super(data);
	}

	static get _name() {
		return 'page';
	}

	toQueryString() {
		let qString = '';
		this.page !== void 0 && (qString += 'page=' + this.page);
		return qString;
	}
}