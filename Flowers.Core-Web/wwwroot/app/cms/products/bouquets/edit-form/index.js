import {EventEmitter, Component} from '@angular/core';
import template from './template.html'

@Component({
	selector: 'bouquet-info-edit-form',
	template: template,
	providers: [],
	inputs: ['model'],
	outputs: ['onChange']
})
class BouquetsInfoEditFormComponent {
	constructor() {
		this.onChange = new EventEmitter();
		this.model = {
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

	ngOnInit() {
		console.log(this.model);
	}

	ngOnDestroy() {

	}

}

BouquetsInfoEditFormComponent.parameters = [];

export default BouquetsInfoEditFormComponent;