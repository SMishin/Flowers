import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import data from './data';
import template from './product-template.html'

function findItem(id) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id === id) {
			return data[i];
		}
	}
}

@Component({
	template: template,
	providers: []
})
class ProductComponent {
	constructor(route) {

		this.sub = route.params.subscribe(params => {
			this.model = findItem(+params['id']);
		});
	}

	onSubmit(){

	}

	ngOnInit() {

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

ProductComponent.parameters = [
	ActivatedRoute
];

export default ProductComponent;