import React from 'react'
import template from './template.jsx'
import filterStore from '../../products/filter/store'
import store from '../../products/store'
import FlowersService from '../../../common/flowers-service';

class FlowersList extends React.Component {

	constructor() {
		super();
		this._flowersService = new FlowersService();

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
			let state = filterStore.getState();
			return this._flowersService.getPublished(state);
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

export default FlowersList;