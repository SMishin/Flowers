import React from 'react'
import template from './template.jsx'

class OrderDetails extends React.Component {

	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			model: {}
		};
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	componentDidMount() {

	}


	componentWillUnmount() {

	}

	render() {
		return template.apply(this, []);
	}
}

export default OrderDetails;