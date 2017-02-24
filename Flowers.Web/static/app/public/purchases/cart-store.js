import createStore from '../createStore';
const key = 'cart';

function add(prevState, id, updateStore) {

	prevState.ids.indexOf(id) === -1 && prevState.ids.push(id);
	(prevState.items[id] && prevState.items[id]++ ) || ( prevState.items[id] = 1);
	prevState.count++;

	localStorage.setItem(key, JSON.stringify(prevState));
	updateStore(prevState);

}

let cart = localStorage.getItem(key);
if (cart) {
	cart = JSON.parse(cart)
}
else {
	cart =
		{
			ids: [],
			items: {},
			count: 0
		};
}

export default createStore(cart, [add]);