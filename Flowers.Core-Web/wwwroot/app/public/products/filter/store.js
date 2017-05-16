import createStore from '../../createStore';
import {browserHistory} from 'react-router'
import FilterSet from './filter-set';
import FlowersTypesFilter from '../../../common/filters/flowers-types';
//import ProductTypeFilter from '../../../common/filters/product-type';
import PageFilter from '../../../common/filters/page';

let filter = new FilterSet();

if (window.__INITIAL_STATE__ !== void 0) {

	if (window.__INITIAL_STATE__.filter !== void 0) {
		filter.applyFilter(FlowersTypesFilter._name, new FlowersTypesFilter(window.__INITIAL_STATE__.filter));
	}

	// if (window.__INITIAL_STATE__.productType !== void 0) {
	// 	filter.applyFilter(ProductTypeFilter._name, new ProductTypeFilter({type: window.__INITIAL_STATE__.productType}));
	// }

	if (window.__INITIAL_STATE__.data.totalCount > window.__INITIAL_STATE__.data.pageSize) {
		filter.applyFilter(PageFilter._name, new PageFilter({page: window.__INITIAL_STATE__.data.page}));
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