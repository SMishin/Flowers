import createStore from '../../createStore';
import FlowersTypesFilter from '../../../common/flowers-filter';
import ProductsFilter from '../../../common/products-filter';

function updatePage(prevState, page, updateStore) {
	prevState.page = page;

	updateStore(new FlowersTypesFilter(prevState));
}

function updateFlowersTypes(prevState, filter, updateStore) {
	updateStore(new FlowersTypesFilter(filter));
}

let filter;
if (window.__INITIAL_STATE__ !== void 0) {

	if(window.__INITIAL_STATE__.filter !== void 0) {
		filter = new FlowersTypesFilter(window.__INITIAL_STATE__.filter);
	}

	if(window.__INITIAL_STATE__.productType !== void 0) {
		filter = new ProductsFilter();
	}

	if (window.__INITIAL_STATE__.data.totalCount > window.__INITIAL_STATE__.data.pageSize) {
		filter.page = window.__INITIAL_STATE__.data.page;
	}
}
else {
	filter = new FlowersTypesFilter();
}

export default createStore(filter, [updatePage, updateFlowersTypes], function (source) {
	return new FlowersTypesFilter(source);
});