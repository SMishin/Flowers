import {Component, NgZone} from '@angular/core';
import ColorsService from './colors-service';
import template from './template.html'

function newItem() {
	return {
		id: '#ffffff',
		name: null
	}
}

@Component({
	template: template
})
class ColorsComponent {

	constructor(ngZone, colorsService) {
		this._ngZone = ngZone;
		this._colorsService = colorsService;
		this.items = [];
		this.newItem = newItem();
	}

	ngOnInit() {
		this._colorsService.get()
			.then(data => {
				this.items = data;
			});

	}

	onSubmit(form) {
		this._colorsService.save(this.newItem)
			.then(() => {
				this.items.push(this.newItem);
				this.newItem = newItem();
			});
	}

	remove(id) {

		if (!confirm('Удалить?')) {
			return;
		}

		this._colorsService.remove(id)
			.then(() => {
				let i = this.items.length;
				while (i--) {
					if (this.items[i].id === id) {
						this.items.splice(i, 1);
					}
				}
			});

	}

	ngOnDestroy() {
	}

}

ColorsComponent.parameters = [
	NgZone,
	ColorsService
];

export default ColorsComponent;