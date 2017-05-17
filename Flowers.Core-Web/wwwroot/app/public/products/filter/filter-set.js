import  Filter from '../../../common/filters/filter'
import  PageFilter from '../../../common/filters/page';
function concatQueryStrings(str1, str2) {

	if (str2 !== '') {
		str1 += (str1 === '' ? '?' : '&');
		str1 += str2;
	}

	return str1;
}

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
		let pageFilter = '';

		for (let fname in this.filters) {
			let strFilter = this.filters[fname].toQueryString();

			if (fname === PageFilter._name) {
				pageFilter = strFilter;
				continue;
			}

			qString = concatQueryStrings(qString, strFilter);
		}

		qString = concatQueryStrings(qString, pageFilter);

		this._qString = qString;
		return qString;
	}
}