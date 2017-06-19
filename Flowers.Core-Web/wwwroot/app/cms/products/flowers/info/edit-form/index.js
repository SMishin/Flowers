import {EventEmitter, Component} from '@angular/core';
import  FlowersTypesService from '../../../../flowers-type/flowers-types-service';
import template from './template.html'

@Component({
	selector: 'flower-info-edit-form',
	template: template,
	providers: [],
	inputs: ['model'],
	outputs: ['onChange']
})
class FlowerInfoEditFormComponent {
	constructor(flowersTypesService) {
		this._flowersTypesService = flowersTypesService;

		this.onChange = new EventEmitter();
		this.flowerTypes = [];
		this.model = {
			flowerVariants: [],
			colors: []
		};
	}

	ngOnInit() {
		this._flowersTypesService.get().then(data => {
			console.log(data);
			this.flowerTypes = data;
		});
	}

	onSubmit() {
		console.log(this.model);

		this.onChange.emit(this.model);
	}

	productColorsChanged($event) {
		this.model.colors = $event;
	}

	productPricesChanged($event) {
		this.model.flowerVariants = $event;
	}


	ngOnDestroy() {

	}

}

FlowerInfoEditFormComponent.parameters = [
	FlowersTypesService
];

export default FlowerInfoEditFormComponent;