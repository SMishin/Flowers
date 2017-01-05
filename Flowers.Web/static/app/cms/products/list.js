import {Component} from '@angular/core';
import data from './data';
import template from './list-template.html'

@Component({
	template: template,
	providers: []
})
class ProductListComponent {
	constructor() {


		this.data = [];
		let group = [];
		for (let i = 0; i < data.length; i++) {
			group.push(data[i]);

			if ((i + 1) % 3 === 0) {
				this.data.push(group);
				group = [];
			}
		}

		console.log(this.data);
	}

	ngOnInit() {

	}

	ngOnDestroy() {
	}

}

ProductListComponent.parameters = [];

export default ProductListComponent;