import React from 'react'
import template from './template.jsx'
import store from '../store'

class FlowerList extends React.Component {

	constructor() {
		super();
		this.state = {
			items: store.getState().flowers,
			loading: false
		};

		this.unsubsctibe = store.subscribe(() => this.listener());

	}

	listener() {
		let state = store.getState();
		this.setState({
			items: state.flowers,
			loading : state.loading
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