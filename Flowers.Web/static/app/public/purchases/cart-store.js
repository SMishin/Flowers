import createStore from '../createStore';

function add(prevState, id, updateStore) {
	prevState.push(id);
	updateStore(prevState);
}

export default createStore([], [add]);