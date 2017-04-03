import React from 'react'
import template from './template.jsx'
import store from '../store'

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
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default FlowerFilter;