import React from 'react'
import template from './template.jsx'
import store from '../flowers/store';

class Paging extends React.Component {

	constructor(props) {
		super();
		console.log(arguments);
		this.state = {
			model: props.route.model
		};

		this.unsubsctibe = store.subscribe(() => this.listener());
	}

	onClick(page) {
		store.changePage(page);
	}

	listener() {
		let state = store.getState().flowers;

		this.setState({
			model: state
		});
	}

	componentDidMount() {
		console.log(this);
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default Paging;