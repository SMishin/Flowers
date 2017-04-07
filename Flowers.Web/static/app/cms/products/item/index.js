import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import template from './product-template.html'

@Component({
	template: template,
	providers: []
})
class ProductComponent {
	constructor(route, productsService) {
		this._flowersService = productsService;
		this.model = {
			id : route.firstChild && route.firstChild.params.value.id
		};
	}

	ngOnInit() {

	}

	ngOnDestroy() {
	}

}

ProductComponent.parameters = [
	ActivatedRoute
];

export default ProductComponent;