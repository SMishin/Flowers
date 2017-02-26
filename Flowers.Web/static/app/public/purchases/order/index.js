import React from 'react'
import template from './template.jsx'

class Order extends React.Component {

	constructor() {
		super();
		this.state = {};
	}


	componentDidMount() {

	}


	componentWillUnmount() {

	}

	render() {
		return template.apply(this, []);
	}
}

export default Order;