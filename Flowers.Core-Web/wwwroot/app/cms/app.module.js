import {NgModule}      from '@angular/core';
import {RouterModule} from '@angular/router';

import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {appRoutes} from './app.routing';

import HttpClient from '../core/http-client';
import AppComponent from './app.component';

import ProductListComponent from './products/list/index';
import ProductsService from '../common/products-service';
import ProductColors from './products/colors/index';
import ProductInfoEditFormComponent from './products/edit-form/index';
import NewProductComponent from './products/new-product/index'
import ProductComponent from './products/item/index'
import ProductInfoComponent from './products/info/index'

import FlowersService from '../common/flowers-service';
import FlowersDataResolver from './products/flowers/data-resolver';
import FlowersListComponent from './products/flowers/list/index'
import NewFlowerComponent from './products/flowers/new-flower/index.js'
import FlowerInfoComponent from './products/flowers/info/index'
import FlowerInfoEditFormComponent from './products/flowers/info/edit-form/index';
import FlowerPrices from './products/flowers/info/edit-form/prices/index';

import UploadImagesComponent from './products/product-images/index'
import DropZoneDirective from './products/product-images/drop-zone/index'
import FileBrowserDirective from './products/product-images/file-browser/index'

import BouquetsService from '../common/bouquets-service';
import BouquetsDataResolver from './products/bouquets/data-resolver';
import BouquetsListComponent from './products/bouquets/list/index';
import NewBouquetComponent from './products/bouquets/new-bouquet/index';
import BouquetInfoComponent from './products/bouquets/info/index';
import BouquetsInfoEditFormComponent from './products/bouquets/edit-form/index';

import ColorsComponent from './colors/index';
import ColorsFilterComponent from './colors/filter/index';
import ColorsService from './colors/colors-service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
		RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,

	    NewProductComponent,
	    ProductListComponent,
	    ProductComponent,
	    ProductInfoEditFormComponent,
	    ProductColors,
	    ProductInfoComponent,

	    FlowersListComponent,
	    NewFlowerComponent,
	    FlowerInfoComponent,
	    FlowerInfoEditFormComponent,
	    FlowerPrices,

	    BouquetsListComponent,
	    NewBouquetComponent,
	    BouquetInfoComponent,
	    BouquetsInfoEditFormComponent,

	    UploadImagesComponent,
	    DropZoneDirective,
	    FileBrowserDirective,

	    ColorsComponent,
		ColorsFilterComponent
    ],
    providers: [
	    HttpClient,
	    ProductsService,
	    FlowersService,
	    FlowersDataResolver,
	    BouquetsDataResolver,
	    BouquetsService,
	    ColorsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}