import {RouterModule} from '@angular/router';
import ProductsComponent from './products/index'

const appRoutes = [
	{
		path: '_cms',
		children: [
			{
				path: '',
				redirectTo: 'products',
				pathMatch: 'full'
			},
			{
				path: 'products',
				component: ProductsComponent,
				useAsDefault: true
			}
		]
	},
	{
		path: '**',
		redirectTo: 'products',
		//component: PageNotFoundComponent
	}

];

export const appRoutingProviders = [];

export const routing = RouterModule.forRoot(appRoutes);