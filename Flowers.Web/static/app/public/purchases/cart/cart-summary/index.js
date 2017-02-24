import React from 'react'
import template from './template.jsx'
import CartStore from '../../cart-store';

class CartSummary extends React.Component {

	constructor() {
		super();
		this.state = CartStore.getState();
	}

	componentWillUnmount() {

	}

	render() {
		return template.apply(this, []);
	}
}

export default CartSummary;