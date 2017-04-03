import createStore from '../createStore';
import ProductsService from '../../common/products-service';
import HttpClient from '../../core/http-client';

let productsService = new ProductsService(new HttpClient());

function updateFilter(prevState, filter, updateStore) {

	prevState.loading = true;
	updateStore(prevState);

	productsService.get(filter).then(function (data) {

		setTimeout(function () {
			updateStore({
				flowers : data,
				filter: filter,
				loading:false
			});
		}, 150);
	});
}

function changePage(prevState, newPage, updateStore) {
	prevState.filter.page = newPage;
	return updateFilter(prevState, prevState.filter, updateStore);
}

export default createStore(window.__INITIAL_STATE__ || {}, [updateFilter, changePage]);