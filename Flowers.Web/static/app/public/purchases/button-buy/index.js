import React from 'react'
import template from './template.jsx'
import cartStore from '../cart-store'

class ButtonBuy extends React.Component {

	constructor() {
		super();
		this.click = this.click.bind(this);
	}

	click() {
		cartStore.add(this.props.itemId)
	}

	render() {
		return template.apply(this, []);
	}

}

export default ButtonBuy;