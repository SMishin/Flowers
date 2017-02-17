import React from 'react';
import ReactDOM from 'react-dom';

import  ButtonBuy from './purchases/button-buy/index'
import  Cart from './purchases/cart/index'

function renderBuyButtons() {
	let elems = document.querySelectorAll('.buy'),
		i = elems.length
		;

	while (i--) {
		ReactDOM.render(<ButtonBuy itemId={+elems[i].getAttribute('item-id')}/>,
			elems[i]);
	}
}

function renderCart() {
	ReactDOM.render(<Cart />,
		document.querySelector('.shopping_cart_contaner'));
}

renderCart();
renderBuyButtons();
