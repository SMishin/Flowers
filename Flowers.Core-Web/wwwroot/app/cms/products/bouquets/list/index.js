import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import BouquetsService from '../../../../common/bouquets-service';

import template from './template.html'

@Component({
	template: template,
	providers: []
})
class BouquetsListComponent {

	constructor(router, route, bouquetsService) {

		this._router = router;
		this._route = route;
		this._bouquetsService = bouquetsService;
		this.items = [];
	}

	ngOnInit() {
		this.sub = this._route.data
			.subscribe(rData => {
				this.items = rData.data.items;
			});

	}

	filterChange(filter) {
		console.log("BouquetsListComponent", filter);
		this._bouquetsService.get(filter).then(data => {
			this.items = data;
		});
		//filerSet.applyFilter(filter._name, filter);
		//this._router.navigate(['./'], {queryParams: filerSet.toObject(), relativeTo: this._route, replaceUrl: true});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

BouquetsListComponent.parameters = [
	Router,
	ActivatedRoute,
	BouquetsService
];

export default BouquetsListComponent;