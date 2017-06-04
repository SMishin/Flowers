import {Component} from '@angular/core';
import ProductsService from '../../../common/products-service';
import {Router, ActivatedRoute} from '@angular/router';
import template from './template.html'

@Component({
	template: template,
	providers: []
})
class NewProductComponent {
	constructor(productsService, router, route) {
		this._flowersService = productsService;
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

NewProductComponent.parameters = [
	ProductsService,
	Router,
	ActivatedRoute
];

export default NewProductComponent;