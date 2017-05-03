import {EventEmitter, Component} from '@angular/core';
import ColorsService from '../../colors/colors-service';
import template from './template.html'

@Component({
	selector: 'product-colors',
	template: template,
	inputs: ['model'],
	outputs: ['onChange']
})
class ProductColors {
	constructor(colorsService) {
		this.onChange = new EventEmitter();
		this._colorsService = colorsService;
		this.allColors = [];
		//this.model = [];
	}

	ngOnInit() {
		this.model === void 0 && (this.model = []);

		this._colorsService.get()
			.then(data => {
				this.allColors = data;
			});
	}

	onRemove($event, id) {

		$event.preventDefault();

		let index = this.model.indexOf(id);

		if (index === -1) {
			return;
		}

		this.model.splice(index, 1);
		this.onChange.emit(this.model);
	}

	onSelect($event, id) {

		$event.preventDefault();

		if (this.model.indexOf(id) !== -1) {
			return;
		}

		this.model.push(id);
		this.onChange.emit(this.model);
	}

	ngOnDestroy() {

	}

}

ProductColors.parameters = [
	ColorsService
];

export default ProductColors;