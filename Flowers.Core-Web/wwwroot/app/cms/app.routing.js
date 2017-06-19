import FlowersListComponent from './products/flowers/list/index'
import NewFlowerComponent from './products/flowers/new-flower/index'
import ProductComponent from './products/common/item/index'
import ProductImagesComponent from './products/common/product-images/index'
import FlowerInfoComponent from './products/flowers/info/index'
import FlowersDataResolver from './products/flowers/data-resolver';
//
import {BouquetsModule} from './products/bouquets/module'

import ColorsComponent from './colors/index'
import FlowersTypesComponent from './flowers-type/index';

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

export const appRoutes = [
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
				loadChildren: () => BouquetsModule
			},
			{
				path: 'colors',
				component: ColorsComponent
			},
			{
				path: 'flowers-types',
				component: FlowersTypesComponent
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
