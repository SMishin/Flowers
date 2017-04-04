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

		store.updateFilter({types});
		this.setState({types});
	}

	listener() {
		let state = store.getState();
		this.setState(state.filter);

		let qString = '';

		if (state.filter.types && state.filter.types.length > 0) {
			qString += '?filter=' + state.filter.types.reduce(function (prev, current) {
					return `${prev},${current}`;
				})
		}

		browserHistory.push(window.location.pathname + qString);


	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default FlowerFilter;