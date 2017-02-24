import React from 'react'

export default function template() {

	return <div className="cart_block block">
		<div className="block_content">

			<div className="cart_block_list">
				<p className="cart_block_no_products">
					No products
				</p>
				<div className="cart-prices">
					<div className="cart-prices-line first-line  unvisible">
																<span className="cart_block_shipping_cost ajax_cart_shipping_cost">
																	To be determined
																</span>
						<span>
																	Shipping
																</span>
					</div>
					<div className="cart-prices-line last-line">
						<span className="price cart_block_total ajax_block_cart_total">$0.00</span>
						<span>Total</span>
					</div>
				</div>
				<p className="cart-buttons">
					<a id="button_order_cart" className="btn btn-default btn-sm icon-right" href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?controller=order" title="Check out" rel="nofollow">
																<span>
																	Check out
																</span>
					</a>
				</p>
			</div>
		</div>
	</div>
}

