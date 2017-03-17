import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import ProductsService from './../products-service';
import template from './template.html'

@Component({
	template: template,
	providers: []
})
class ProductInfoComponent {
	constructor(route, router, productsService) {
		this._productsService = productsService;
		this._router = router;
		this.model = {
			id: route.parent.params && route.parent.params.value.id
		};

		this.sub = route.parent.params.subscribe(params => {
			let id = params['id'];

			if (id) {
				this._productsService.get(+id)
					.then(data => {
						this.model = data;
					})
			}

		});
	}

	onSubmit(form) {
		console.log(form);
		this._productsService.save(this.model);
	}

	remove() {

		if (!confirm('Удалить?')) {
			return;
		}

		this._productsService
			.remove(this.model.id)
			.then(() => {
				this._router.navigate(['../_cms/products']);
			})
		;
	}

	ngOnInit() {

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

ProductInfoComponent.parameters = [
	ActivatedRoute,
	Router,
	ProductsService
];

export default ProductInfoComponent;