import {NgModule}      from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {CommonModule} from '../common/module'
import {routes} from './routing';

import BouquetsDataResolver from './data-resolver';
import BouquetsListComponent from './list/index';
import NewBouquetComponent from './new-bouquet/index';
import BouquetInfoComponent from './info/index';
import BouquetsInfoEditFormComponent from './edit-form/index';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
		RouterModule.forChild(routes),
		CommonModule
    ],
    declarations: [

	    BouquetsListComponent,
	    NewBouquetComponent,
	    BouquetInfoComponent,
	    BouquetsInfoEditFormComponent
    ],
    providers: [
	    BouquetsDataResolver
    ]
})
export class BouquetsModule {
}