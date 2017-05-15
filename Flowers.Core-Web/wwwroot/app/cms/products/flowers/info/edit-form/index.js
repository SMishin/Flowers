import {EventEmitter, Component} from '@angular/core';
import template from './template.html'

@Component({
	selector: 'flower-info-edit-form',
	template: template,
	providers: [],
	inputs: ['model'],
	outputs: ['onChange']
})
class FlowerInfoEditFormComponent {
	constructor() {
		this.onChange = new EventEmitter();
		this.model = {
			flowerVariants: [],
			colors: []
		};
	}

	onSubmit() {
		console.log(this.model);

		this.onChange.emit(this.model);
	}

	productColorsChanged($event){
		this.model.colors = $event;
	}

	productPricesChanged($event) {
		this.model.flowerVariants = $event;
	}

	ngOnInit() {
		console.log(this.model);
		//this.model.prices = [];
	}

	ngOnDestroy() {

	}

}

FlowerInfoEditFormComponent.parameters = [];

export default FlowerInfoEditFormComponent;