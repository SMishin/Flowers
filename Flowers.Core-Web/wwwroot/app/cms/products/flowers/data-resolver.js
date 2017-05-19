import {Injectable}             from '@angular/core';
import FlowersService from '../../../common/flowers-service';

@Injectable()
class FlowersDataResolver {
	constructor(flowersService) {
		this.flowersService = flowersService;
	}

	resolve(activatedRouteSnapshot, routerStateSnapshot) {
		return this.flowersService.get()
			.then(data => {
				return {
					type: 0,
					items: data
				};
			});
	}
}

FlowersDataResolver.parameters = [
	FlowersService
];

export default FlowersDataResolver;