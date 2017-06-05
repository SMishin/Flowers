import React from 'react'
import template from './template.jsx'

class ProductList extends React.Component {

	constructor(props) {
		super();
		this.state = props.data;
	}

	componentWillReceiveProps(props) {
		this.setState(props.data);
		//console.log(arguments);
	}

	componentWillUpdate() {
		//console.log(arguments);
	}

	componentDidUpdate() {
		
	}

	componentWillUnmount() {

	}

	render() {
		return template.apply(this, []);
	}
}

export default ProductList;