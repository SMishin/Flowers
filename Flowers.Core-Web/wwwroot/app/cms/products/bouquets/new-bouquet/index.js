import {Component} from '@angular/core';
import BouquetsService from '../../../../common/bouquets-service';
import {Router, ActivatedRoute} from '@angular/router';
import template from './template.html'

@Component({
	template: template,
	providers: []
})
class NewBouquetComponent {
	constructor(bouquetsService, router, route) {
		this._flowersService = bouquetsService;
		this._router = router;
		this._route = route;
	}

	onSubmit(form) {
		console.log(form);
		this._flowersService.save(form).then(res => {
			this._router.navigate(['../', res], {relativeTo: this._route})
		});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
	}

}

NewBouquetComponent.parameters = [
	BouquetsService,
	Router,
	ActivatedRoute
];

export default NewBouquetComponent;