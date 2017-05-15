import React from 'react'
import template from './template.jsx'
import store from '../flowers/store';

class TotalCounter extends React.Component {

	constructor(props) {
		super();
		this.state = {
			totalCount: props.totalCount
		};

		this.unsubsctibe = store.subscribe(() => this.listener());
	}

	onClick(page) {
		store.changePage(page);
	}

	listener() {
		let state = store.getState();

		this.setState({
			totalCount: state.flowers.totalCount
		});
	}

	componentDidMount() {
		console.log('TotalCounter',this);
	}

	componentWillUnmount() {
		this.unsubsctibe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default TotalCounter;