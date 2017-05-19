export default class Filter {
	constructor(data) {
		if (data) {
			for (let prop in data) {
				this[prop] = data[prop];
			}
		}
	}
}