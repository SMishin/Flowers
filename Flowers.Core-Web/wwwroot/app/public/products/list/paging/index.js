import React from 'react'
import template from './template.jsx'
import store from '../../filter/store';

class Paging extends React.Component {

	constructor(props) {
		super();
		console.log(arguments);
		this.state = {
			model: props.model
		};

		//this.unsubsctibe = store.subscribe(() => this.listener());
	}

	componentWillReceiveProps(props) {
		this.setState({
			model: props.model
		});
	}

	onClick(page) {
		store.updatePage(page);
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