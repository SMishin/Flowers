import React from 'react'
import template from './template.jsx'
import store from '../../products/filter/store'

class FlowerTypesFilter extends React.Component {

	constructor() {
		super();
		this.state = store.getState();
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

		store.updateFlowersTypes(filter);
		this.setState(filter);
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default FlowerTypesFilter;