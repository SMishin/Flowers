class Cart {

	constructor() {
		console.log('Cart constructor');
		this.items = [];
	}

	add(id) {
		this.items.indexOf(id) === -1 && this.items.push(id);
		console.log(this.items);
	}

}

export default new Cart();