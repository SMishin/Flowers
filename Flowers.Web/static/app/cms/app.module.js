import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {routing} from './app.routing';

import HttpClient from './core/http-client';
import AppComponent from './app.component';
import ProductListComponent from './products/list/index';
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
	    NewFlowerComponent,
	    ProductComponent,
	    FlowerInfoComponent,
	    FlowerInfoEditFormComponent,
	    FlowerPrices,
	    UploadImagesComponent,
	    DropZoneDirective,
	    FileBrowserDirective
    ],
    providers: [
	    HttpClient,
	    FlowersService,
	    FlowersDataResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}