import React from 'react'
import template from './template.jsx'
import cart from '../cart'

class ButtonBuy extends React.Component {

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

export default ButtonBuy;