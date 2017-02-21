import React from 'react'
import template from './template.jsx'
import CartStore from '../cart-store'

class ButtonBuy extends React.Component {

	constructor() {
		super();
		this.click = this.click.bind(this);
	}

	click() {
		CartStore.add(this.props.itemId)
	}

	render() {
		return template.apply(this, []);
	}

}

export default ButtonBuy;