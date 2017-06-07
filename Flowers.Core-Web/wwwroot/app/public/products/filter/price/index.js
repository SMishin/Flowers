import React from 'react';
import template from './template.jsx';
import store from '../store';
import PriceFilter from '../../../../common/filters/price';

class PriceFilterView extends React.Component {

	constructor() {
		super();
		this.state = store.getState().filters[PriceFilter._name];

		if (this.state === void 0 || this.state === null) {
			this.state = {from: '', to: ''};
		}

		this.filterOnChanged = this.filterOnChanged.bind(this);
	}

	filterOnChanged(event) {

		console.log(event.target.value);
		console.log(event.target.checked);

		let newState = {};
		newState[event.target.name] = +event.target.value;
		this.setState(newState);

		let filter = new PriceFilter(this.state);

		store.applyFilter({name: PriceFilter._name, value: filter});
		//this.setState(filter);
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default PriceFilterView;