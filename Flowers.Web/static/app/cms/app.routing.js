import {RouterModule} from '@angular/router';
import ProductListComponent from './products/list/index'
import NewFlowerComponent from './products/flowers/new-flower/index'
import ProductComponent from './products/item/index'
import ProductImagesComponent from './products/product-images/index'
import FlowerInfoComponent from './products/flowers/info/index'
import FlowersDataResolver from './products/flowers/data-resolver';

import ColorsComponent from './colors/index'

const productChildrenRoutes =
	[
		{
			path: '',
			redirectTo: 'info',
			pathMatch: 'full'
		},
		{
			path: 'info',
			component: FlowerInfoComponent
		},
		{
			path: 'images',
			component: ProductImagesComponent
		}
	];

const appRoutes = [
	{
		path: '_cms',
		children: [
			{
				path: '',
				redirectTo: 'products/flowers',
				pathMatch: 'full'
			},
			{
				path: 'products/flowers',
				component: ProductListComponent,
				useAsDefault: true,
				resolve: {
					data: FlowersDataResolver
				}
			},
			{
				path: 'products/flowers/new',
				component: NewFlowerComponent
			},
			{
				path: 'products/flowers/:id',
				component: ProductComponent,
				children: productChildrenRoutes
			},
			{
				path: 'colors',
				component: ColorsComponent
			},
			{
				path: '**',
				redirectTo: 'products/flowers'
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