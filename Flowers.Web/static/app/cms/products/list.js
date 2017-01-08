import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import ProductsService from './products-service';
import template from './list-template.html'

@Component({
	template: template,
	providers: []
})
class ProductListComponent {

	constructor(router, route, productsService) {

		this._router = router;
		this._route = route;
		this._productsService = productsService;

		this.data = [];

		this._productsService.get()
			.then(data => {

				let group = [];
				for (let i = 0; i < data.length; i++) {
					group.push(data[i]);

					if ((i + 1) % 3 === 0) {
						this.data.push(group);
						group = [];
					}
				}

				console.log(this.data);

			});
	}

	ngOnInit() {

	}

	onItemClick(id) {
		this._router.navigate(['../product', id], {relativeTo: this._route});
	}

	ngOnDestroy() {
	}

}

ProductListComponent.parameters = [
	Router,
	ActivatedRoute,
	ProductsService
];

export default ProductListComponent;