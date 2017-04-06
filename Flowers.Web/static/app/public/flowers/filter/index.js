import React from 'react'
import template from './template.jsx'
import store from '../store'

import { browserHistory } from 'react-router'


class FlowerFilter extends React.Component {

	constructor() {
		super();
		this.state = store.getState().filter;

		this.unsubsctibe = store.subscribe(() => this.listener());

		this.filterOnChanged = this.filterOnChanged.bind(this);

	}

	filterOnChanged(event) {

		console.log(event.target.value);
		console.log(event.target.checked);

		let types = this.state.types,
			value = + event.target.value,
			index = types.indexOf(value)
			;

		if (index === -1) {
			types.push(value);
		} else {
			types.splice(index, 1);
		}

		let filter = {types};

		store.updateFilter(filter);
		this.setState(filter);
	}

	listener() {
		let state = store.getState();
		this.setState(state.filter);

		browserHistory.push(window.location.pathname + state.filter.toQueryString());

	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default FlowerFilter;