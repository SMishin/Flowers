import createStore from '../createStore';
import ProductsService from '../../common/products-service';
import HttpClient from '../../core/http-client';

let productsService = new ProductsService(new HttpClient());

function changePage(prevState, newPage, updateStore) {

	productsService.get(newPage).then(function (data) {

		console.log(data);

		prevState.preloaded = false;
		prevState.flowers = data;
		prevState.paging.page = newPage;

		updateStore(prevState);
	});
}


let state;
if (window.__INITIAL_STATE__) {
	state = window.__INITIAL_STATE__;
	state.preloaded = true;
} else {
	state = {items: []};
}
export default createStore(state, [changePage]);