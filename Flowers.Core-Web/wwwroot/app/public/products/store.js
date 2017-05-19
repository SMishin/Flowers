import createStore from '../createStore';


function changePage(prevState, newPage, updateStore) {
	prevState.filter.page = newPage;
	return updateFilter(prevState, prevState.filter, updateStore);
}

function fetchData(prevState, dataProviderFunction, updateStore) {

	prevState.loading = true;
	updateStore(prevState);

	dataProviderFunction()
		.then(function (data) {

			setTimeout(function () {
				updateStore({
					data,
					loading: false
				});
			}, 150);
		})
}

export default createStore(window.__INITIAL_STATE__ || {}, [fetchData], function (source) {
	return {
		data: JSON.parse(JSON.stringify(source.data)),
		loading: source.loading
	}
});