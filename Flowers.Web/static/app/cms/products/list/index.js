import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import template from './list-template.html'

@Component({
	template: template,
	providers: []
})
class ProductListComponent {

	constructor(router, route) {

		this._router = router;
		this._route = route;

		this.data = [];

	}

	ngOnInit() {
		this.sub = this._route.data
			.subscribe(rData => {
				let group = [],
					data = rData.data
					;
				for (let i = 0; i < data.length; i++) {
					group.push(data[i]);

					if ((i + 1) % 3 === 0) {
						this.data.push(group);
						group = [];
					}
				}

				if (group.length !== 0) {
					this.data.push(group);
				}

				console.log(this.data);
			});

	}

	onItemClick(id) {
		this._router.navigate(['./', id], {relativeTo: this._route});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

ProductListComponent.parameters = [
	Router,
	ActivatedRoute
];

export default ProductListComponent;