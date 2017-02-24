import React from 'react';
import ReactDOM from 'react-dom';

import  ButtonBuy from './purchases/button-buy/index'
import  CartMenu from './purchases/cart/cart-menu/index'
import  CartSummary from './purchases/cart/cart-summary/index';

function renderBuyButtons() {
	let elems = document.querySelectorAll('.add_to_cart_button_container'),
		i = elems.length
		;

	while (i--) {
		ReactDOM.render(<ButtonBuy itemId={+elems[i].getAttribute('item-id')}/>,
			elems[i]);
	}
}

function renderCartMenu() {
	ReactDOM.render(<CartMenu />,
		document.querySelector('.shopping_cart_contaner'));
}

function renderCartSummary() {
	let elem = document.getElementById('order-detail-content');

	if (elem) {
		ReactDOM.render(<CartSummary />, elem
		);
	}

}


renderCartMenu();
renderCartSummary();
renderBuyButtons();
