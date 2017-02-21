export default function createStore(preloadedState, actions) {

	let currentState = preloadedState,
		currentListeners = [],
		nextListeners = currentListeners;

	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {
			nextListeners = currentListeners.slice()
		}
	}

	function getState() {
		return currentState
	}

	function subscribe(listener) {
		if (typeof listener !== 'function') {
			throw new Error('Expected listener to be a function.')
		}

		let isSubscribed = true;

		ensureCanMutateNextListeners();
		nextListeners.push(listener);

		return function unsubscribe() {
			if (!isSubscribed) {
				return
			}

			isSubscribed = false;

			ensureCanMutateNextListeners();
			let index = nextListeners.indexOf(listener);
			nextListeners.splice(index, 1)
		}
	}

	function updateState(newState) {
		currentState = newState;
		let listeners = currentListeners = nextListeners,
			i = listeners.length;

		while (i--) {
			listeners[i]()
		}
	}

	let store = {
		subscribe,
		getState
	};

	if (!actions) {
		return store;
	}

	let i = actions.length;

	while (i--) {
		let item = actions[i];

		store[item.name] = function () {
			let params = Array.prototype.slice.apply(arguments)
				;

			params.unshift(currentState);
			params.push(updateState);

			return item.apply(this, params);
		};
	}

	return store;
}