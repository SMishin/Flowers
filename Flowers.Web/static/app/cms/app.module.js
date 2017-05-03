import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {routing} from './app.routing';

import HttpClient from './core/http-client';
import AppComponent from './app.component';
import ProductListComponent from './products/list/index';
import ProductColors from './products/colors/index';
import NewFlowerComponent from './products/flowers/new-flower/index.js'
import ProductComponent from './products/item/index'
import FlowerInfoComponent from './products/flowers/info/index'
import FlowerInfoEditFormComponent from './products/flowers/info/edit-form/index';
import FlowerPrices from './products/flowers/info/edit-form/prices/index';

import UploadImagesComponent from './products/product-images/index'
import DropZoneDirective from './products/product-images/drop-zone/index'
import FileBrowserDirective from './products/product-images/file-browser/index'

import FlowersService from './products/flowers/flowers-service';
import FlowersDataResolver from './products/flowers/data-resolver';

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

	    ProductListComponent,
	    ProductComponent,
	    ProductColors,

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
	    FlowersService,
	    FlowersDataResolver,
	    ColorsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}