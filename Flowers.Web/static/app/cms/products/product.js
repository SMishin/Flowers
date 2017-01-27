import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ProductsService from './products-service';
import template from './product-template.html'

@Component({
	template: template,
	providers: []
})
class ProductComponent {
	constructor(route, productsService) {
		this._productsService = productsService;
		this.model = {
			id : route.params.value.id
		};

		this.sub = route.params.subscribe(params => {
			let id = params['id'];

			if (id) {
				this._productsService.get(+id)
					.then(data => {
						this.model = data;
					})
			}

		});
	}

	onSubmit() {
		console.log(this.model);
		this._productsService.save(this.model);
	}

	ngOnInit() {

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

ProductComponent.parameters = [
	ActivatedRoute,
	ProductsService
];

export default ProductComponent;