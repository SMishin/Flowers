import {Injectable}             from '@angular/core';
import ProductsService from '../../../common/products-service';
let type = 1;
@Injectable()
class BouquetsDataResolver {
	constructor(productsService) {
		this._bouquetsService = productsService;
	}

	resolve(activatedRouteSnapshot, routerStateSnapshot) {
		return this._bouquetsService
			.get({
				type
			})
			.then(data => {
				return {
					type,
					items: data
				};
			});
	}
}

BouquetsDataResolver.parameters = [
	ProductsService
];

export default BouquetsDataResolver;