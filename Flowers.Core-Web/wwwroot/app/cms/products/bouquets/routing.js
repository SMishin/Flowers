
import BouquetsDataResolver from './data-resolver';
import BouquetsListComponent from './list/index';
import NewBouquetComponent from './new-bouquet/index';
import BouquetInfoComponent from './info/index';
import ProductComponent  from '../common/item/index'
import ProductImagesComponent from '../common/product-images/index'

export const routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: BouquetsListComponent,
				resolve: {
					data: BouquetsDataResolver
				}
			},
			{
				path: 'new',
				component: NewBouquetComponent
			},
			{
				path: ':id',
				component: ProductComponent,
				children:	[
					{
						path: '',
						redirectTo: 'info',
						pathMatch: 'full'
					},
					{
						path: 'info',
						component: BouquetInfoComponent
					},
					{
						path: 'images',
						component: ProductImagesComponent
					}
				]
			},
		]
	}
];
