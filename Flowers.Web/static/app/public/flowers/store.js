import createStore from '../createStore';
import ProductsService from '../../common/products-service';
import HttpClient from '../../core/http-client';
import FlowersFilter from './flowersFilter';

let productsService = new ProductsService(new HttpClient());

function updateFilter(prevState, filter, updateStore) {

	prevState.loading = true;
	updateStore(prevState);

	let newFilter = new FlowersFilter(filter);

	productsService.get(newFilter).then(function (data) {

		setTimeout(function () {
			updateStore({
				flowers: data,
				filter: newFilter,
				loading: false
			});
		}, 150);
	});
}

function changePage(prevState, newPage, updateStore) {
	prevState.filter.page = newPage;
	return updateFilter(prevState, prevState.filter, updateStore);
}

window.__INITIAL_STATE__ && (window.__INITIAL_STATE__.filter = new FlowersFilter(window.__INITIAL_STATE__.filter));

export default createStore(window.__INITIAL_STATE__ || {}, [updateFilter, changePage], function (source) {
	return {
		flowers: JSON.parse(JSON.stringify(source.flowers)),
		filter: new FlowersFilter(source.filter),
		loading: source.loading
	}
});