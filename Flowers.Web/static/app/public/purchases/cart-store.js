import createStore from '../createStore';
const key = 'cart';

function add(prevState, id, updateStore) {
	(!(prevState.items[id] === undefined) && prevState.items[id]++ ) || ( prevState.items[id] = 1);
	prevState.count++;

	localStorage.setItem(key, JSON.stringify(prevState));
	updateStore(prevState);

}

function decrease(prevState, id, updateStore) {

	if (prevState.items[id] === undefined) {
		return;
	}

	prevState.items[id] > 0 && prevState.items[id]--;
	prevState.count--;

	localStorage.setItem(key, JSON.stringify(prevState));
	updateStore(prevState);

}

function changeCount(prevState, count, id, updateStore) {

	if (prevState.items[id] === undefined) {
		return;
	}

	prevState.items[id] = count;
	prevState.count = 0;

	for (let key in prevState.items) {
		prevState.count += prevState.items[key];
	}

	localStorage.setItem(key, JSON.stringify(prevState));
	updateStore(prevState);

}

function remove(prevState, id, updateStore) {

	if (prevState.items[id] === undefined) {
		return;
	}

	let count = prevState.items[id];
	delete prevState.items[id];

	prevState.count = prevState.count - count;

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
			items: {},
			count: 0
		};
}

export default createStore(cart, [add, remove, decrease, changeCount]);