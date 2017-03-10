import {RouterModule} from '@angular/router';
import ProductListComponent from './products/list'
import NewProductComponent from './products/new-product/index'
import ProductComponent from './products/product'
import ProductImagesComponent from './products/product-images/index'
import ProductInfoComponent from './products/product-info/index'

const productChildrenRoutes =
	[
		{
			path: '',
			redirectTo: 'info',
			pathMatch: 'full'
		},
		{
			path: 'info',
			component: ProductInfoComponent
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
				redirectTo: 'products',
				pathMatch: 'full'
			},
			{
				path: 'products',
				component: ProductListComponent,
				useAsDefault: true
			},
			{
				path: 'product/new',
				component: NewProductComponent
			},
			{
				path: 'product/:id',
				component: ProductComponent,
				children: productChildrenRoutes
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