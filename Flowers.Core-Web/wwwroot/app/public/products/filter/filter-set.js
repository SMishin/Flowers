import  Filter from '../../../common/filters/filter'

export default class FilterSet extends Filter {
	constructor(data) {
		super(data);
		this.filters = this.filters === void 0 ? {} : this.filters;
		this._qString = '';
	}

	applyFilter(name, value) {
		this.filters[name] = value;
		this._qString = '';
	}

	detachFilter(name) {
		delete this.filters[name];
		this._qString = '';
	}

	get queryString() {
		return this.toQueryString();
	}

	clone() {
		return new FilterSet(this);
	}

	toQueryString() {

		if (this._qString !== '') {
			return this._qString;
		}

		let qString = '';

		for (let fname in this.filters) {
			let strFilter = this.filters[fname].toQueryString();

			if (strFilter !== '') {
				qString += (qString === '' ? '?' : '&');
				qString += strFilter;
			}
		}

		this._qString = qString;
		return qString;
	}
}