import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import FlowersService from '../../../../common/flowers-service';

import template from './template.html'

@Component({
	template: template,
	providers: []
})
class FlowersListComponent {

	constructor(router, route, flowersService) {

		this._router = router;
		this._route = route;
		this._flowersService = flowersService;
		this.items = [];
	}

	ngOnInit() {
		this.sub = this._route.data
			.subscribe(rData => {
				this.items = rData.data.items;
			});

	}

	filterChange(filter) {
		console.log("FlowersListComponent", filter);
		this._flowersService.get(filter).then(data => {
			this.items = data;
		});
		//filerSet.applyFilter(filter._name, filter);
		//this._router.navigate(['./'], {queryParams: filerSet.toObject(), relativeTo: this._route, replaceUrl: true});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

FlowersListComponent.parameters = [
	Router,
	ActivatedRoute,
	FlowersService
];

export default FlowersListComponent;