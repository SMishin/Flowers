import {EventEmitter,Component} from '@angular/core';
import template from './template.html'

@Component({
	selector: 'product-info-edit-form',
	template: template,
	providers: [],
	inputs:['model'],
	outputs: ['onChange']
})
class ProductInfoEditFormComponent {
	constructor() {
		this.onChange = new EventEmitter();
		this.model = {};
	}

	onSubmit() {
		console.log(this.model);
		this.onChange.emit(this.model);
	}

	ngOnInit() {
		console.log(this.model);
	}

	ngOnDestroy() {

	}

}

ProductInfoEditFormComponent.parameters = [];

export default ProductInfoEditFormComponent;