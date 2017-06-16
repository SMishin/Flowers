import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import BouquetsService from '../../../../../common/bouquets-service';
import template from './template.html'

@Component({
	template: template,
	providers: []
})
class BouquetInfoComponent {
	constructor(route, router, bouquetsService) {
		this._flowersService = bouquetsService;
		this._router = router;
		this._route = route;
		this.model = {
			id: route.parent.params && route.parent.params.value.id
		};

		this.sub = route.parent.params.subscribe(params => {
			let id = params['id'];

			if (id) {
				this._flowersService
					.get({id: +id})
					.then(data => {
						this.model = data;
					})
			}

		});
	}

	onSubmit(form) {
		console.log(form);
		this._flowersService.save(this.model);
	}

	remove() {

		if (!confirm('Удалить?')) {
			return;
		}

		this._flowersService
			.remove(this.model.id)
			.then(() => {
				this._router.navigate(['../../'], {relativeTo: this._route});
			})
		;
	}

	ngOnInit() {

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

BouquetInfoComponent.parameters = [
	ActivatedRoute,
	Router,
	BouquetsService
];

export default BouquetInfoComponent;