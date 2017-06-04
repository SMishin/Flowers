import {Component, EventEmitter} from '@angular/core';
import ColorsService from '../colors-service';
import ColorsFilter from '../../../common/filters/colors';
import template from './template.html'

@Component({
	selector: 'colors-filter',
	template: template,
	outputs: ["change"]
})
class ColorsFilterComponent {

	constructor(colorsService) {
		this._colorsService = colorsService;
		this.items = [];
		this.selected = [];
		this.change = new EventEmitter();
	}

	ngOnInit() {
		this._colorsService.get()
			.then(data => {
				data.push({id: '#nocolor'});
				this.items = data;
			});

	}

	onClick($event, item) {
		$event.stopPropagation();

		let index = this.selected.indexOf(item.id);

		if (index === -1) {
			this.selected.push(item.id);
		} else {
			this.selected.splice(index, 1);
		}

		console.log(this.selected);
		this.change.emit(new ColorsFilter({colors: this.selected}));

	}

	ngOnDestroy() {
	}

}

ColorsFilterComponent.parameters = [
	ColorsService
];

export default ColorsFilterComponent;