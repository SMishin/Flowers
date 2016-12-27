import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {routing} from './app.routing';

//import HttpClient from 'core/http-client';
import AppComponent from './app.component';
import ProductsComponent from './products/index.js';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
	    routing
    ],
    declarations: [
        AppComponent,
	    ProductsComponent
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}