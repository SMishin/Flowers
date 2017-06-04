import {Injectable}             from '@angular/core';
import BouquetsService from '../../../common/bouquets-service';
import {ActivatedRoute} from '@angular/router';

@Injectable()
class BouquetsDataResolver {
	constructor(bouquetsService, route) {
		this._flowersService = bouquetsService;
		this._route = route;
	}

	resolve(activatedRouteSnapshot, routerStateSnapshot) {

		// this._route.queryParams.subscribe(params=>{
		// 	console.log(params);
		// });

		console.log("data resolving");
		return this._flowersService
			.get()
			.then(data => {
				return {
					type: 1,
					items: data
				};
			});
	}
}

BouquetsDataResolver.parameters = [
	BouquetsService,
	ActivatedRoute
];

export default BouquetsDataResolver;