import {NgModule}      from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {CommonModule} from './products/common/module'
//import {BouquetsModule} from './products/bouquets/module'
import {appRoutes} from './app.routing';

import HttpClient from '../core/http-client';
import AppComponent from './app.component';

import ProductsService from '../common/products-service';
import BouquetsService from '../common/bouquets-service';

import FlowersService from '../common/flowers-service';
import FlowersDataResolver from './products/flowers/data-resolver';
import FlowersListComponent from './products/flowers/list/index'
import NewFlowerComponent from './products/flowers/new-flower/index.js'
import FlowerInfoComponent from './products/flowers/info/index'
import FlowerInfoEditFormComponent from './products/flowers/info/edit-form/index';
import FlowerPrices from './products/flowers/info/edit-form/prices/index';

import ColorsComponent from './colors/index';
import ColorsService from './colors/colors-service';

@NgModule({
    imports: [
        BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		//BouquetsModule,
		RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,

	    FlowersListComponent,
	    NewFlowerComponent,
	    FlowerInfoComponent,
	    FlowerInfoEditFormComponent,
	    FlowerPrices,
		ColorsComponent
    ],
    providers: [
	    HttpClient,
	    ProductsService,
	    FlowersService,
	    FlowersDataResolver,
	    BouquetsService,
	    ColorsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}