import {Component, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import template from './list-template.html'
import FilterSet from '../../../../common/filters/filter-set';
import types from '../../types';

let filerSet = new FilterSet();

function prepareData(items) {
	let group = [],
		data = []
	;

	for (let i = 0; i < items.length; i++) {
		group.push(items[i]);

		if ((i + 1) % 3 === 0) {
			data.push(group);
			group = [];
		}
	}

	if (group.length !== 0) {
		data.push(group);
	}

	return data;

}

@Component({
	selector: 'items-list',
	inputs: ['items'],
	template: template,
	outputs: ['filterChange']
})
class ProductListComponent {

	constructor(router, route) {

		this.filterChange = new EventEmitter();
		this._router = router;
		this._route = route;
		this.types = types;
		this.data = [];
	}

	ngOnInit() {

		this.type = types[this.items[0].type];
		this.data = prepareData(this.items);

		console.log(this.data);
	}

	ngOnChanges(changes) {
		//console.log(this.items);
		//console.log(changes);
		this.data = prepareData(this.items);
	}

	onFilterChange(filter) {
		filerSet.applyFilter(filter._name, filter);
		this.filterChange.emit(filerSet);
		this._router.navigate(['./'], {queryParams: filerSet.toObject(), relativeTo: this._route, replaceUrl: true});
	}

	onItemClick(id) {
		this._router.navigate(['./', id], {relativeTo: this._route});
	}

	ngOnDestroy() {
	}

}

ProductListComponent.parameters = [
	Router,
	ActivatedRoute
];

export default ProductListComponent;