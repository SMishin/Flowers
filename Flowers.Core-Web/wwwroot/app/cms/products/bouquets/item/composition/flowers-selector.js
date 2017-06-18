import {Directive, EventEmitter, ElementRef} from '@angular/core';
import $ from 'jquery';
import 'select2'

@Directive({
	selector: '[flowers-selector]',
	inputs: ['data', 'selectedData'],
	outputs: ['onSelect', 'onUnselect'],
	host: {}
})
class FlowersSelectorDirective {

	ngOnChanges(changes) {
		this.initSelect2(changes.data.currentValue, changes.selectedData.currentValue);
		//console.log(changes)
	}

	constructor(el) {
		this._el = el.nativeElement;
		this.onSelect = new EventEmitter();
		this.onUnselect = new EventEmitter();
	}

	ngOnInit() {
		this.initSelect2(this.data, this.selectedData);
	}

	initSelect2(data, selectedData) {

		if (data === void 0 || data === null || data.length === 0) {
			return;
		}

		data = data.map(item => {
			item.text = item.name;
			return item;
		});

		$(this._el).select2({data})
			.on('select2:select', evt => {
				//console.log($(this._el).select2('val'));
				this.onSelect.emit(evt.params.data.id);
			})
			.on('select2:unselect', evt => {
				//console.log(evt.params.data.id);
				this.onUnselect.emit(evt.params.data.id);
			})
		;

		$(this._el).val(selectedData).trigger("change");

	}

	ngOnDestroy() {
		$(this._el).select2('destroy');
	}


}

FlowersSelectorDirective.parameters = [
	ElementRef
];

export default FlowersSelectorDirective;
