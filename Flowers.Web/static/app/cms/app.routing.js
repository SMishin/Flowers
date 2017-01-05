import {RouterModule} from '@angular/router';
import ProductListComponent from './products/list'
import ProductComponent from './products/product'

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
				component: ProductListComponent,
				useAsDefault: true
			},
			{
				path: 'product/:id',
				component: ProductComponent,
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