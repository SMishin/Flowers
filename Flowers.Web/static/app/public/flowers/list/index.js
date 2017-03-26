import React from 'react'
import template from './template.jsx'
import store from '../store'

class FlowerList extends React.Component {

	constructor() {
		super();
		this.state = {
			items: store.getState().flowers
		};

		this.unsubsctibe = store.subscribe(() => this.listener());

	}

	listener() {
		this.setState({
			items: store.getState().flowers
		});
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default FlowerList;