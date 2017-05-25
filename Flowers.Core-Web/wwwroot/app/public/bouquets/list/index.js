import React from 'react'
import template from './template.jsx'
import filterStore from '../../products/filter/store'
import store from '../../products/store'
import BouquetsService from '../../../common/bouquets-service';


class BouquetsList extends React.Component {

	constructor() {
		super();
		this._bouquetsService = new BouquetsService();

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
			return this._bouquetsService.getPublished(filterStore.getState());
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