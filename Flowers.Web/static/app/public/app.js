import React from 'react';
import ReactDOM from 'react-dom';

import  ButtonBuy from './cart/button-buy/index'

let elems = document.querySelectorAll('.buy'),
	i = elems.length
	;

while (i--) {
	ReactDOM.render(<ButtonBuy itemId={+elems[i].getAttribute('item-id')}/>,
		elems[i]);
}
