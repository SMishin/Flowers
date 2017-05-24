import React from 'react'
import template from './template.jsx'
import filterStore from '../../products/filter/store'
import store from '../../products/store'
import ProductsService from '../../../common/products-service';
import ProductTypeFilter from '../../../common/filters/product-type';

class BouquetsList extends React.Component {

	constructor() {
		super();
		this._bouquetsService = new ProductsService();

		let state = store.getState();
		this.state = {
			data: state.data,
			items: state.data.items,
			loading: false
		};

		this.unsubsctibe = store.subscribe(() => this.listener());
		this.filterUnsubsctibe = filterStore.subscribe(() => this.filterListener());
	}

	filterListener() {
		store.fetchData(() => {
			let state = filterStore.getState().clone();
			state.applyFilter(ProductTypeFilter._name, new ProductTypeFilter({type: 1}));
			return this._bouquetsService.getPublished(state);
		});
	}

	listener() {
		let state = store.getState();
		this.setState({
			data: state.data,
			items: state.data.items,
			loading: state.loading
		});
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		this.unsubsctibe();
		this.filterUnsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default BouquetsList;