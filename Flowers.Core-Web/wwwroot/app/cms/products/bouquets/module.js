import {NgModule}      from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {CommonModule} from '../common/module'
import {routes} from './routing';

import BouquetsDataResolver from './data-resolver';
import BouquetComponent from './item/index';
import BouquetsListComponent from './list/index';
import NewBouquetComponent from './new-bouquet/index';
import BouquetCompositionComponent from './item/composition/index';
import BouquetInfoComponent from './item/info/index';
import BouquetsInfoEditFormComponent from './item/edit-form/index';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
		RouterModule.forChild(routes),
		CommonModule
    ],
    declarations: [

		BouquetComponent,
	    BouquetsListComponent,
	    NewBouquetComponent,
		BouquetCompositionComponent,
	    BouquetInfoComponent,
	    BouquetsInfoEditFormComponent
    ],
    providers: [
	    BouquetsDataResolver
    ]
})
export class BouquetsModule {
}