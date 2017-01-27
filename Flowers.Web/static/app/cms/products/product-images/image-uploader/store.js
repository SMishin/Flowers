import {FluxStore} from 'core/flux/index';

class DocumentsService {

	constructor() {
		this._store = new FluxStore();
		this.docs = [];

	}

	addListener(callback, context) {
		return this._store.addListener(callback, context);
	}

	removeListener(subscription) {
		this._store.removeListener(subscription);
	}

	getDocs() {
		return this.docs;
	}

	clear() {
		this.docs.length = 0;
		this._store._emitChange();
	}

	remove(id) {
		let i = this.docs.length;

		while (i--) {
			if (this.docs[i].id && this.docs[i].id === id) {
				this.docs.splice(i, 1);
				return;
			}
		}

		this._store._emitChange();
	}

	add(file) {
		this.docs.push(file);
		this._store._emitChange();
	}

	destroy() {
		console.log('DocumentsService has been destroyed');
	}
}

export default DocumentsService;