import {EventEmitter, Component} from '@angular/core';
import template from './template.html'

@Component({
	selector: 'product-prices',
	template: template,
	providers: [],
	inputs: ['model'],
	outputs: ['onChange']
})
class ProductPrices {
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

ProductPrices.parameters = [];

export default ProductPrices;