import React from 'react'
import {Link} from 'react-router'


export default function template() {
	return <div>
		<ul className="step clearfix" id="order_step">
			<li className="first">
				<Link to="/order/cart" activeClassName="step_current">
					<em>01.</em> Список товаров
				</Link>
			</li>
			<li className="step_todo">
				<Link to="/order/details" activeClassName="step_current">
					<em>02.</em> Получатель и адрес доставки
				</Link>
			</li>
		</ul>
		{this.props.children}
	</div>

}

