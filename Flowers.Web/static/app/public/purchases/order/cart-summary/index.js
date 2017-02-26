import React from 'react'
import template from './template.jsx'
import CartStore from '../../cart-store';
import ProductsService from '../../../../common/products/products-service';
import HttpClient from '../../../../core/http-client';

class CartSummary extends React.Component {

	constructor() {
		super();

		this.productsService = new ProductsService(new HttpClient());
		this.countChange = this.countChange.bind(this);
		this.decrease = this.decrease.bind(this);
		this.increase = this.increase.bind(this);
		this.listener = this.listener.bind(this);
		this.unsubscribe = CartStore.subscribe(this.listener);
		this.state = {};
		this.loadInfo();
	}


	loadInfo() {
		let cart = CartStore.getState(),
			tasks = [];

		for (let key in cart.items) {
			tasks.push(this.productsService.get(key));
		}

		Promise.all(tasks).then(data => {
			let price = 0,
				i = data.length
				;

			let items = cart.items;

			while (i--) {

				data[i].count = items[data[i].id];
				items[data[i].id] = data[i];
				price += data[i].count * data[i].price;
			}

			this.setState({
				price: price,
				items: items
			});
		});
	}

	listener() {
		let cart = CartStore.getState();

		this.setState((prevState, props) => {

			let items = prevState.items,
				price = 0,
				toRemove = []
				;

			for (let key in items) {

				let item = items[key];

				if (cart.items[item.id] === undefined) {
					toRemove.push(key);
					continue;
				}

				item.count = cart.items[item.id];
				price += item.count * item.price;
			}

			let i = toRemove.length;

			while (i--) {
				delete items[toRemove[i]];
			}

			return {
				price: price,
				items: items
			}
		});
	}


	decrease(id) {
		CartStore.decrease(id);
	}

	increase(id) {
		CartStore.add(id);
	}

	componentDidMount() {

	}

	countChange(value, id) {
		CartStore.changeCount(+value, id);
	}

	remove(id) {
		CartStore.remove(id);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return template.apply(this, []);
	}
}

export default CartSummary;