import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import  FlowersService from '../../../../../common/flowers-service';
import  BouquetsService from '../../../../../common/bouquets-service';
import template from './template.html'

@Component({
	template: template
})
class BouquetCompositionComponent {

	constructor(route, flowersService, bouquetsService) {
		this._flowersService = flowersService;
		this._bouquetsService = bouquetsService;

		this.id = route.parent.params && route.parent.params.value.id;
		this.flowerList = [];
		this.selectedFlowers = [];
	}

	ngOnInit() {

		Promise.all([this._flowersService.get(), this._bouquetsService.getFlowers(this.id)])
			.then(values => {
				this.flowerList = values[0];
				this.selectedFlowers = values[1];
			});

	}

	onSelect(flowerId) {
		console.log(flowerId);

		this._bouquetsService.addFlower(
			{
				id: this.id,
				flowerId
			});
	}

	onUnselect(flowerId) {
		this._bouquetsService.removeFlower(
			{
				id: this.id,
				flowerId
			});
	}

	ngOnDestroy() {

	}

}

BouquetCompositionComponent.parameters = [
	ActivatedRoute,
	FlowersService,
	BouquetsService
];

export default BouquetCompositionComponent;