import {Component} from '@angular/core';
import ProductsService from '../../../../common/flowers-service';
import {Router, ActivatedRoute} from '@angular/router';
import template from './template.html'

@Component({
	template: template,
	providers: []
})
class NewFlowerComponent {
	constructor(productsService, router, route) {
		this._bouquetsService = productsService;
		this._router = router;
		this._route = route;
	}

	onSubmit(form) {
		console.log(form);
		this._bouquetsService.save(form).then(res => {
			this._router.navigate(['../', res], {relativeTo: this._route})
		});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
	}

}

NewFlowerComponent.parameters = [
	ProductsService,
	Router,
	ActivatedRoute
];

export default NewFlowerComponent;