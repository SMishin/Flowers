import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'

import  ButtonBuy from './purchases/button-buy/index'
import  CartMenu from './purchases/cart/cart-menu/index'
import  Order from './purchases/order/index';
import  CartSummary from './purchases/order/cart-summary/index';
import  OrderDetails from './purchases/order/order-details/index';

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
		ReactDOM.render(
			<Router history={browserHistory}>
				<Route path="/order" component={Order}>
					<Route path="/order/cart" component={CartSummary}/>
					<Route path="/order/details" component={OrderDetails}/>
				</Route>
			</Router>, elem);
	}

}


renderCartMenu();
renderCartSummary();
renderBuyButtons();
