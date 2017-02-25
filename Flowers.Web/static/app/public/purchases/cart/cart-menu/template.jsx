import React from 'react'
import CartDetails from './details/index'
export default function template() {

	return <div className="shopping_cart">
		<a href="/order/cart"
		   title="Перейти в корзину" rel="nofollow">
			<b>
				Корзина
			</b>
			<span className="ajax_cart_no_product">({this.state.items.count})</span>
		</a>

		<CartDetails />
	</div>
}

