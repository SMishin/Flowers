import React from 'react'
import ReactDOM from 'react-dom';
import template from './template.jsx'
import store from '../store'

class FlowerList extends React.Component {

	constructor() {
		super();
		let state = store.getState();
		this.state = {
			flowers : state.flowers,
			items: state.flowers.items,
			loading: false
		};

		this.unsubsctibe = store.subscribe(() => this.listener());

	}

	listener() {
		let state = store.getState();
		this.setState({
			flowers :state.flowers,
			items: state.flowers.items,
			loading : state.loading
		});
	}

	componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollIntoView();
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default FlowerList;