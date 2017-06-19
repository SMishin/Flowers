import {Component} from '@angular/core';
import FlowersTypesService from './flowers-types-service';
import template from './template.html'

function newItem() {
	return {
		id: -1,
		name: null
	}
}

@Component({
	template: template
})
class FlowersTypesComponent {

	constructor(flowersTypesService) {
		this._flowersTypesService = flowersTypesService;
		this.items = [];
		this.newItem = newItem();
	}

	ngOnInit() {
		this._flowersTypesService.get()
			.then(data => {
				this.items = data;
			});

	}

	onSubmit(form) {
		this._flowersTypesService.save(this.newItem)
			.then(() => {
				this.items.push(this.newItem);
				this.newItem = newItem();
			});
	}

	remove(id) {

		if (!confirm('Удалить?')) {
			return;
		}

		this._flowersTypesService.remove(id)
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

FlowersTypesComponent.parameters = [
	FlowersTypesService
];

export default FlowersTypesComponent;