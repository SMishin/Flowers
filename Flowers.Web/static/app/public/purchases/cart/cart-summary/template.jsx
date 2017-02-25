import React from 'react'


export default function template() {

	let tbodyRows = [];

	if (!this.state.items) {
		tbodyRows.push(<tr key={'loading'}>
				<td colSpan="4">
					Загрузка...
				</td>
			</tr>
		)
	} else {

		for (let key in this.state.items) {
			let item = this.state.items[key],
				href = 'products/' + (item.type === 0 ? 'flowers' : 'toys') + '/' + item.id
				;

			tbodyRows.push(
				<tr key={key}
				    className="cart_item last_item first_item address_0 odd">

					<td className="cart_product">
						<a href={href}>
							<img
								src={item.imageUrl}
								alt={item.name}/>
						</a>
					</td>

					<td className="cart_description">
						<p className="product-name">
							<a href={href}>
								{item.name}
							</a>
						</p>
						<small>
							{item.summary}
						</small>
					</td>

					<td className="cart_unit">
										<span className="price" id="product_price_11_112_0">
											<span className="price special-price">
												{item.price} ₽
											</span>
										</span>
					</td>
					<td className="cart_quantity text-center">

						<input size="2" type="text" autoComplete="off"
						       onChange={(event) => this.countChange(event.target.value, item.id)}
						       value={item.count}
						       className="cart_quantity_input form-control grey"
						       name="quantity_11_112_0_0"/>

						<div className="cart_quantity_button clearfix">
							<sapn className="cart_quantity_down btn btn-default button-minus"
							      title="Уменьшить" onClick={() => this.decrease(item.id)}>
										<span>
											<i className="fa fa-minus"></i>
										</span>
							</sapn>
							<span className="cart_quantity_up btn btn-default button-plus"
							      onClick={() => this.increase(item.id)}
							      title="Увеличить">
										<span>
											<i className="fa fa-plus"></i>
										</span>
							</span>
						</div>
					</td>
					<td className="cart_total">
						<span className="price">
							{item.count * item.price } ₽
						</span>
					</td>
					<td className="cart_delete text-center">
						<div>
							<span rel="nofollow" title="Удалить"
							      onClick={() => {
								      this.remove(item.id)
							      }}
							      className="cart_quantity_delete">
								<i className="fa fa-trash-o"></i>
							</span>
						</div>
					</td>
				</tr>
			)
		}

	}

	return <table id="cart_summary" className="table table-bordered stock-management-on">
		<thead>
		<tr>
			<th className="cart_product first_item"></th>
			<th className="cart_description item">Описание</th>
			<th className="cart_unit item">Цена</th>
			<th className="cart_quantity item">Количество</th>
			<th className="cart_total item">Итоговая цена</th>
			<th className="cart_delete last_item">&nbsp;</th>
		</tr>
		</thead>
		<tfoot>
		<tr className="cart_total_price">
			<td colSpan="4" className="total_price_container text-right">
				<span>
					Всего
				</span>
			</td>
			<td colSpan="2" className="price">
				<span id="total_price">
					{this.state.price} ₽
				</span>
			</td>
		</tr>
		</tfoot>
		<tbody>
		{tbodyRows}
		</tbody>
	</table>

}

