import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {routing} from './app.routing';

import HttpClient from '../core/http-client';
import AppComponent from './app.component';

import ProductListComponent from './products/list/index';
import ProductsService from '../common/products-service';
import ProductColors from './products/colors/index';
import ProductInfoEditFormComponent from './products/edit-form/index';
import NewProductComponent from './products/new-product/index'
import ProductComponent from './products/item/index'
import ProductInfoComponent from './products/info/index'

import NewFlowerComponent from './products/flowers/new-flower/index.js'
import FlowerInfoComponent from './products/flowers/info/index'
import FlowerInfoEditFormComponent from './products/flowers/info/edit-form/index';
import FlowerPrices from './products/flowers/info/edit-form/prices/index';

import UploadImagesComponent from './products/product-images/index'
import DropZoneDirective from './products/product-images/drop-zone/index'
import FileBrowserDirective from './products/product-images/file-browser/index'

import FlowersService from '../common/flowers-service';
import FlowersDataResolver from './products/flowers/data-resolver';

import BouquetsDataResolver from './products/bouquets/data-resolver';

import ColorsComponent from './colors/index';
import ColorsService from './colors/colors-service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
	    routing
    ],
    declarations: [
        AppComponent,

	    NewProductComponent,
	    ProductListComponent,
	    ProductComponent,
	    ProductInfoEditFormComponent,
	    ProductColors,
	    ProductInfoComponent,

	    NewFlowerComponent,
	    FlowerInfoComponent,
	    FlowerInfoEditFormComponent,
	    FlowerPrices,

	    UploadImagesComponent,
	    DropZoneDirective,
	    FileBrowserDirective,

	    ColorsComponent
    ],
    providers: [
	    HttpClient,
	    ProductsService,
	    FlowersService,
	    FlowersDataResolver,
	    BouquetsDataResolver,
	    ColorsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}