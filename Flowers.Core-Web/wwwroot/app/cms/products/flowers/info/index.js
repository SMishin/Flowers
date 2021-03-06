import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import FlowersService from '../../../../common/flowers-service';
import template from './template.html'

@Component({
	template: template,
	providers: []
})
class FlowerInfoComponent {
	constructor(route, router, flowersService) {
		this._flowersService = flowersService;
		this._router = router;
		this.model = {
			id: route.parent.params && route.parent.params.value.id
		};

		this.sub = route.parent.params.subscribe(params => {
			let id = params['id'];

			if (id) {
				this._flowersService.get({id:+id})
					.then(data => {
						this.model = data;
					})
			}

		});
	}

	onSubmit(form) {
		console.log(form);
		this._flowersService.save(this.model);
	}

	remove() {

		if (!confirm('Удалить?')) {
			return;
		}

		this._flowersService
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

FlowerInfoComponent.parameters = [
	ActivatedRoute,
	Router,
	FlowersService
];

export default FlowerInfoComponent;