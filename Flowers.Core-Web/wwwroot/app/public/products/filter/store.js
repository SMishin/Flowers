import  initialState from '../../initial-state';
import createStore from '../../createStore';
import {browserHistory} from 'react-router'
import FilterSet from '../../../common/filters/filter-set';
import FlowersTypesFilter from '../../../common/filters/flowers-types';
import BouquetsTypesFilter from '../../../common/filters/bouquets-types';
import ColorsFilter from '../../../common/filters/colors';
import PriceFilter from '../../../common/filters/price';
import PageFilter from '../../../common/filters/page';

let filter = new FilterSet();

if (initialState !== void 0) {

	if (initialState.flowersTypesFilter !== void 0) {
		filter.applyFilter(FlowersTypesFilter._name, new FlowersTypesFilter(initialState.flowersTypesFilter));
	}

	if (initialState.bouquetsTypesFilter !== void 0) {
		filter.applyFilter(BouquetsTypesFilter._name, new BouquetsTypesFilter(initialState.bouquetsTypesFilter));
	}

	if (initialState.colorsFilterModel !== void 0
		&& initialState.colorsFilterModel.colorFilter !== void 0 ) {
		filter.applyFilter(ColorsFilter._name, new ColorsFilter(initialState.colorsFilterModel.colorFilter));
	}

	if (initialState.priceFilter !== void 0) {
		filter.applyFilter(PriceFilter._name, new PriceFilter(initialState.priceFilter));
	}

	if (initialState.data.totalCount > initialState.data.pageSize) {
		filter.applyFilter(PageFilter._name, new PageFilter({page: initialState.data.page}));
	}
}

function applyFilter(prevState, filter, updateStore) {

	prevState.applyFilter(filter.name, filter.value);

	if (filter.name !== PageFilter._name) {
		prevState.detachFilter(PageFilter._name);
	}

	browserHistory.push(window.location.pathname + prevState.toQueryString());

	updateStore(prevState);
}

export default createStore(filter, [applyFilter], function (source) {
	//return new FilterSet(source);
	return source;
});