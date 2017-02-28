import React from 'react'
import template from './template.jsx'
import CartStore from '../../cart-store';
import OrdersService from '../../../../common/orders/orders-service';
import HttpClient from '../../../../core/http-client';


class OrderDetails extends React.Component {

	constructor() {
		super();
		this.ordersService = new OrdersService(new HttpClient());
		this.handleInputChange = this.handleInputChange.bind(this);
		this.checkout = this.checkout.bind(this);
		//this.unsubscribe = CartStore.subscribe(this.listener);
		this.state = {};
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	checkout(e) {
		e.preventDefault();
		let data = {
			details: {
				person: {
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					middleName: this.state.middleName,
					mobilePhone: this.state.mobilePhone,
					email: this.state.email
				},
				address: this.state.address
			},
			products: CartStore.getState().items
		};

		console.log(data);

		this.ordersService.save(data);

	}

	componentDidMount() {

	}


	componentWillUnmount() {
		//this.unsubscribe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default OrderDetails;