import {Component} from '@angular/core';

import template from './product-template.html'

@Component({
	template: template,
	providers: []
})
class ProductComponent {
	constructor(route) {

	}

	ngOnInit() {

	}

	ngOnDestroy() {
	}

}

ProductComponent.parameters = [

];

export default ProductComponent;