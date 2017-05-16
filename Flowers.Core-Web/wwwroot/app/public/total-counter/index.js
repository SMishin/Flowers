import React from 'react'
import template from './template.jsx'
import store from '../products/store';

class TotalCounter extends React.Component {

	constructor(props) {
		super();
		this.state = {
			totalCount: props.totalCount
		};

		this.unsubsctibe = store.subscribe(() => this.listener());
	}

	listener() {
		let state = store.getState();

		this.setState({
			totalCount: state.data.totalCount
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