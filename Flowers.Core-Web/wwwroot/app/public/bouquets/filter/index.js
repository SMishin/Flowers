import React from 'react';
import template from './template.jsx';
import store from '../../products/filter/store';
import BouquetsTypesFilter from '../../../common/filters/bouquets-types';

class BouquetsTypesFilterView extends React.Component {

	constructor() {
		super();
		this.state = store.getState().filters[BouquetsTypesFilter._name] || {types: []};
		this.filterOnChanged = this.filterOnChanged.bind(this);
	}

	filterOnChanged(event) {

		console.log(event.target.value);
		console.log(event.target.checked);

		let types = this.state.types,
			value = +event.target.value,
			index = types.indexOf(value)
		;

		if (index === -1) {
			types.push(value);
		} else {
			types.splice(index, 1);
		}

		let filter = new BouquetsTypesFilter({types});

		store.applyFilter({name: BouquetsTypesFilter._name, value: filter});
		this.setState(filter);
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default BouquetsTypesFilterView;