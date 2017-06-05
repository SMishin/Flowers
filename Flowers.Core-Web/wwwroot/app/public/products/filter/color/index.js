import React from 'react';
import template from './template.jsx';
import store from '../store';
import ColorsFilter from '../../../../common/filters/colors';

class ColorsFilterView extends React.Component {

	constructor() {
		super();
		this.state = store.getState().filters[ColorsFilter._name];
		this.filterOnChanged = this.filterOnChanged.bind(this);
	}

	filterOnChanged(event) {

		console.log(event.target.value);
		console.log(event.target.checked);

		let colors = this.state.colors,
			value = event.target.getAttribute('data-value'),
			index = colors.indexOf(value)
		;

		if (index === -1) {
			colors.push(value);
		} else {
			colors.splice(index, 1);
		}

		let filter = new ColorsFilter({colors});

		store.applyFilter({name: ColorsFilter._name, value: filter});
		this.setState(filter);
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default ColorsFilterView;