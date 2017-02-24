import React from 'react'
import CartDetails from './details/index'
export default function template() {

	return <div className="shopping_cart">
		<a href="/cart"
		   title="View my shopping cart" rel="nofollow">
			<b>Cart</b>
			<span className="ajax_cart_quantity unvisible">
			0
			</span>
			<span className="ajax_cart_product_txt unvisible">Product</span>
			<span className="ajax_cart_product_txt_s unvisible">Products</span>
			<span className="ajax_cart_total unvisible"></span>
			<span className="ajax_cart_no_product">({this.state.items.count})</span>
		</a>

		<CartDetails />
	</div>
}

