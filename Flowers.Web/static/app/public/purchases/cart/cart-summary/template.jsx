import React from 'react'


export default function template() {

	let tbodyRows = [];

	if (this.state.items) {
		for (let key in this.state.items) {
			tbodyRows.push(
				<tr key={key}
				    className="cart_item last_item first_item address_0 odd">

					<td className="cart_product">
						<a href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?id_product=11&amp;controller=product&amp;id_lang=1#/10-color-red/25-size-standard/28-flower_by_type-roses">
							<img
								src="https://ld-prestashop.template-help.com/prestashop_58383/img/p/3/2/32-tm_small_default.jpg"
								alt="Fairtrade Golden Autumn Hand tied"/>
						</a>
					</td>

					<td className="cart_description" data-title="Description">
						<p className="product-name"><a
							href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?id_product=11&amp;controller=product&amp;id_lang=1#/10-color-red/25-size-standard/28-flower_by_type-roses">Fairtrade
							Golden Autumn Hand tied</a></p>
						<small className="cart_ref">
							SKU : 00104
						</small>
						<small>
							<a href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?id_product=11&amp;controller=product&amp;id_lang=1#/10-color-red/25-size-standard/28-flower_by_type-roses">
								Color : Red, Size : Standard, Flower by Type : Roses
							</a>
						</small>
					</td>

					<td className="cart_unit" data-title="Unit price">
										<span className="price" id="product_price_11_112_0">
											<span className="price special-price">$12.80</span>
											<span className="price-percent-reduction small">
												&nbsp;-20%&nbsp;
											</span>
											<span className="old-price">$16.00</span>
										</span>
					</td>
					<td className="cart_quantity text-center" data-title="Quantity">

						<input size="2" type="text" autoComplete="off"
						       className="cart_quantity_input form-control grey"

						       name="quantity_11_112_0_0"/>
						<div className="cart_quantity_button clearfix">
							<a rel="nofollow" className="cart_quantity_down btn btn-default button-minus"
							   id="cart_quantity_down_11_112_0_0"
							   href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?controller=cart&amp;add=1&amp;id_product=11&amp;ipa=112&amp;id_address_delivery=0&amp;op=down&amp;token=b8c06725f8ba8af5e140b0764db45415"
							   title="Subtract">
												<span>
													<i className="fa fa-minus"></i>
												</span>
							</a>
							<a rel="nofollow" className="cart_quantity_up btn btn-default button-plus"
							   id="cart_quantity_up_11_112_0_0"
							   href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?controller=cart&amp;add=1&amp;id_product=11&amp;ipa=112&amp;id_address_delivery=0&amp;token=b8c06725f8ba8af5e140b0764db45415"
							   title="Add">
												<span>
													<i className="fa fa-plus"></i>
												</span>
							</a>
						</div>
					</td>
					<td className="cart_total" data-title="Total">
										<span className="price" id="total_product_price_11_112_0">
											$12.80
										</span>
					</td>
					<td className="cart_delete text-center" data-title="Delete">
						<div>
							<a rel="nofollow" title="Delete" className="cart_quantity_delete" id="11_112_0_0"
							   href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?controller=cart&amp;delete=1&amp;id_product=11&amp;ipa=112&amp;id_address_delivery=0&amp;token=b8c06725f8ba8af5e140b0764db45415">
								<i className="fa fa-trash-o"></i>
							</a>
						</div>
					</td>
				</tr>
			)
		}
	}

	return <table id="cart_summary" className="table table-bordered stock-management-on">
		<thead>
		<tr>
			<th className="cart_product first_item">Product</th>
			<th className="cart_description item">Description</th>
			<th className="cart_unit item">Unit price</th>
			<th className="cart_quantity item">Qty</th>
			<th className="cart_total item">Total</th>
			<th className="cart_delete last_item">&nbsp;</th>
		</tr>
		</thead>
		<tfoot>
		<tr className="cart_total_price">
			<td rowSpan="4" colSpan="3" id="cart_voucher" className="cart_voucher"></td>
			<td rowSpan="3" className="text-right">Total products</td>
			<td rowSpan="2" className="price" id="total_product">$12.80</td>
		</tr>
		<tr style={{display: 'none'}}>
			<td colSpan="3" className="text-right">
				Total gift-wrapping cost
			</td>
			<td colSpan="2" className="price-discount price" id="total_wrapping">
				$0.00
			</td>
		</tr>
		<tr className="cart_total_delivery unvisible">
			<td colSpan="3" className="text-right">Total shipping</td>
			<td colSpan="2" className="price" id="total_shipping">Free shipping!</td>
		</tr>
		<tr className="cart_total_voucher unvisible">
			<td colSpan="3" className="text-right">
				Total vouchers
			</td>
			<td colSpan="2" className="price-discount price" id="total_discount">
				$0.00
			</td>
		</tr>
		<tr className="cart_total_price">
			<td colSpan="3" className="total_price_container text-right">
				<span>Total</span>
				<div className="hookDisplayProductPriceBlock-price">
				</div>
			</td>
			<td colSpan="2" className="price" id="total_price_container">
				<span id="total_price">$12.80</span>
			</td>
		</tr>
		</tfoot>
		<tbody>
		{tbodyRows}
		</tbody>
	</table>

}

