import React from 'react'
import ReactDOM from 'react-dom';
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
		ReactDOM.findDOMNode(this).scrollIntoView();
	}

	componentWillUnmount() {

	}

	render() {
		return template.apply(this, []);
	}
}

export default ProductList;