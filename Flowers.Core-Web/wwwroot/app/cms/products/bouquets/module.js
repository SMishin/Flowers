import {NgModule}      from '@angular/core';
import {RouterModule} from '@angular/router';

import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {appRoutes} from './app.routing';

import BouquetsService from '../common/bouquets-service';
import BouquetsDataResolver from './products/bouquets/data-resolver';
import BouquetsListComponent from './products/bouquets/list/index';
import NewBouquetComponent from './products/bouquets/new-bouquet/index';
import BouquetInfoComponent from './products/bouquets/info/index';
import BouquetsInfoEditFormComponent from './products/bouquets/edit-form/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
		RouterModule.forRoot(appRoutes)
    ],
    declarations: [

	    BouquetsListComponent,
	    NewBouquetComponent,
	    BouquetInfoComponent,
	    BouquetsInfoEditFormComponent,


    ],
    providers: [
	    BouquetsDataResolver,
	    BouquetsService,
    ]
})
export class BouquetsModule {
}