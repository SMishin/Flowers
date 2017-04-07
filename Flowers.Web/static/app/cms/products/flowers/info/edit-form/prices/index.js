import {EventEmitter, Component} from '@angular/core';
import template from './template.html'

@Component({
	selector: 'flower-prices',
	template: template,
	providers: [],
	inputs: ['model'],
	outputs: ['onChange']
})
class FlowerPrices {
	constructor() {
		this.onChange = new EventEmitter();
		//this.model = [];
		this.newItem = {};
	}

	onSubmit() {
		console.log(this.model);
		this.onChange.emit(this.model);
	}


	onAdd() {
		if (!this.model) {
			this.model = [];
		}

		this.model.push({
			size: 0,
			price: 0
		});
	}

	ngOnInit() {
		console.log(this.model);
	}

	ngOnDestroy() {

	}

}

FlowerPrices.parameters = [];

export default FlowerPrices;