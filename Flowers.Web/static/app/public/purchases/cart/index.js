import React from 'react'
import template from './template.jsx'
import CartStore from '../cart-store';

class Cart extends React.Component {

	constructor() {
		super();
		this.listener = this.listener.bind(this);
		this.unsubscribe = CartStore.subscribe(this.listener);
		this.state = {
			items: CartStore.getState()
		};
	}

	listener() {
		this.setState({
			items: CartStore.getState()
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default Cart;