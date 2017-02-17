import React from 'react'
import template from './template.jsx'

class CartDetails extends React.Component {

	constructor() {
		super();
		this.click = this.click.bind(this);
	}

	click() {
		cart.add(this.props.itemId)
	}

	render() {
		return template.apply(this, []);
	}
}

export default CartDetails;
