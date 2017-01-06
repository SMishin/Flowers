import {Component} from '@angular/core';
import appSettings from '../../core/app-settings';
//import DocumentsService from './images-uploader/store';
import HttpClient from '../../core/http-client';
import template from './template.html'

@Component({
	selector: 'product-images',
	template: template,
	//providers: [DocumentsService]
})
class UploadImagesComponent {
	constructor(httpClient, documentsService) {
		this._httpClient = httpClient;
		//this._documentsService = documentsService;
		this._docs = [];
	}

	ngOnInit() {
		this._updateImages();
		//this._documentsService.addListener(this._updateImages, this);
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
	HttpClient
	//DocumentsService
];

export default UploadImagesComponent;
