import {NgModule}      from '@angular/core';
import { CommonModule as AngularCommonModule }  from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import ColorsFilterComponent from './colors/filter/index';
import ProductColorsComponent from './colors/index';
import ProductListComponent from './items-list/index';
import ProductInfoEditFormComponent from './edit-form/index';
import NewProductComponent from './new-product/index'
import ProductComponent from './item/index'
import ProductInfoComponent from './info/index'

import UploadImagesComponent from './product-images/index'
import DropZoneDirective from './product-images/drop-zone/index'
import FileBrowserDirective from './product-images/file-browser/index'

@NgModule({
	imports: [
		AngularCommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		ColorsFilterComponent,
		ProductColorsComponent,

		ProductListComponent,
		NewProductComponent,
		ProductComponent,
		ProductInfoEditFormComponent,
		ProductInfoComponent,

		UploadImagesComponent,
		DropZoneDirective,
		FileBrowserDirective,
	],
	exports: [
		ProductListComponent,
		ProductColorsComponent
	],
	providers: []
})
export class CommonModule {
}