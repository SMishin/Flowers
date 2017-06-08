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

		this.filter = new PriceFilter(this.state);

		this.filterOnChanged = this.filterOnChanged.bind(this);
	}

	filterOnChanged(event) {

		console.log(event.target.value);

		let value = event.target.value;

		if (value !== '' && !value.match(/\d+/)) {
			return;
		}

		this.filter[event.target.name] = value;

		store.applyFilter({name: PriceFilter._name, value: this.filter});

		this.setState(this.filter);
	}

	clearField(name) {
		this.filter[name] = '';

		store.applyFilter({name: PriceFilter._name, value: this.filter});

		this.setState(this.filter);
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default PriceFilterView;