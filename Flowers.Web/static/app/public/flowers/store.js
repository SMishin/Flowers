import createStore from '../createStore';
import ProductsService from '../../common/products-service';
import HttpClient from '../../core/http-client';

let productsService = new ProductsService(new HttpClient());

function changePage(prevState, newPage, updateStore) {

	prevState.loading = true;
	updateStore(prevState);

	productsService.get(newPage).then(function (data) {
		setTimeout(function () {
			updateStore(data);
		},150);
	});
}

export default createStore(window.__INITIAL_STATE__ || {items: []} , [changePage]);