import {Component} from '@angular/core';
import appSettings from '../../core/app-settings';
import ProductImagesService from './product-images-service';
import template from './template.html'

@Component({
	selector: 'product-images',
	template: template,
	inputs: ['productId'],
	providers: [ProductImagesService]
})
class UploadImagesComponent {
	constructor(productImagesService) {
		this._productImagesService = productImagesService;
		this._images = [];
	}

	ngOnInit() {
		this._productImagesService.get(this.productId)
			.then((data) => {
				this._images = data;
			});
	}

	_updateImages() {
		//this._docs = this._documentsService.getDocs();
	}

	onDocumentUploaded(data) {
		console.log(data);
		this._docs.push(data);
	}

	onDocumentRemoved(data) {
		let i = this._docs.length;

		while (i--) {
			if (this._docs[i].fileId && this._docs[i].fileId === data.fileId) {
				this._docs.splice(i, 1);
				return;
			}
		}
	}

	onSubmit(event) {
		event.preventDefault();

		if (!this._docs || this._docs.length === 0) {
			return;
		}

		let data = [],
			i = this._docs.length;

		while (i--) {
			let item = this._docs[i];
			data.push({
				type: item._type,
				fileId: item.id
			});
		}

		let url = `${appSettings.api.url}/documents`;

		this._httpClient.post(url, data)
			.then(data => {
				console.log(data);
				//this._documentsService.clear();
			});
	}
}

UploadImagesComponent.parameters = [
	ProductImagesService
];

export default UploadImagesComponent;
