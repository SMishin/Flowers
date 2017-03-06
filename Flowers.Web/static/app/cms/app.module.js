import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {routing} from './app.routing';

import HttpClient from './core/http-client';
import AppComponent from './app.component';
import ProductListComponent from './products/list.js';
import ProductComponent from './products/product'
import ProductInfoComponent from './products/product-info/index'
import UploadImagesComponent from './products/product-images/index'
import ImageUploaderComponent from './products/product-images/image-uploader/index'
import DropZoneDirective from './products/product-images/drop-zone/index'
import FileBrowserDirective from './products/product-images/file-browser/index'

import ProductsService from './products/products-service';

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
	    ProductInfoComponent,
	    UploadImagesComponent,
	    ImageUploaderComponent,
	    DropZoneDirective,
	    FileBrowserDirective
    ],
    providers: [
	    HttpClient,
	    ProductsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}