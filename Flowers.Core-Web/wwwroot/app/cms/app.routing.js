import {RouterModule} from '@angular/router';

import FlowersListComponent from './products/flowers/list/index'
import NewFlowerComponent from './products/flowers/new-flower/index'
import ProductComponent from './products/item/index'
import ProductImagesComponent from './products/product-images/index'
import FlowerInfoComponent from './products/flowers/info/index'
import FlowersDataResolver from './products/flowers/data-resolver';

import BouquetsDataResolver from './products/bouquets/data-resolver';
import BouquetsListComponent from './products/bouquets/list/index';
import NewBouquetComponent from './products/bouquets/new-bouquet/index';
import BouquetInfoComponent from './products/bouquets/info/index';

import ColorsComponent from './colors/index'

function productChildrenRoutes(infoComponent) {
	return [
		{
			path: '',
			redirectTo: 'info',
			pathMatch: 'full'
		},
		{
			path: 'info',
			component: infoComponent
		},
		{
			path: 'images',
			component: ProductImagesComponent
		}
	];
}

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
				component: FlowersListComponent,
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
				children: productChildrenRoutes(FlowerInfoComponent)
			},
			{
				path: 'products/bouquets',
				component: BouquetsListComponent,
				resolve: {
					data: BouquetsDataResolver
				}
			},
			{
				path: 'products/bouquets/new',
				component: NewBouquetComponent
			},
			{
				path: 'products/bouquets/:id',
				component: ProductComponent,
				children: productChildrenRoutes(BouquetInfoComponent)
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