
import BouquetsDataResolver from './data-resolver';
import BouquetsListComponent from './list/index';
import NewBouquetComponent from './new-bouquet/index';
import BouquetCompositionComponent from './item/composition/index';
import BouquetInfoComponent from './item/info/index';
import BouquetComponent  from './item/index'
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
				component: BouquetComponent,
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
					},
					{
						path: 'composition',
						component: BouquetCompositionComponent
					}
				]
			},
		]
	}
];
