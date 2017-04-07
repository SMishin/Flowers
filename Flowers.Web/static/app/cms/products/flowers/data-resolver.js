import {Injectable}             from '@angular/core';
import FlowersService from './flowers-service';

@Injectable()
class FlowersDataResolver {
	constructor(flowersService) {
		this.flowersService = flowersService;
	}

	resolve(activatedRouteSnapshot, routerStateSnapshot) {
		return this.flowersService.get()
			.then(data => {
				return data;
			});
	}
}

FlowersDataResolver.parameters = [
	FlowersService
];

export default FlowersDataResolver;