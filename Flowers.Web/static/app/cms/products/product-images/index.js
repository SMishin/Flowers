import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ProductImagesService from './product-images-service';
import template from './template.html'

let types = ['image/jpeg', 'image/png'];

function _checkFileType(file) {

	if (!file || !file.type) {
		return false;
	}

	return types.indexOf(file.type) !== -1;
}

function _checkFileSize(file) {

	if (!file || !file.size) {
		return false;
	}

	let size = (file.size / 1024 / 1024);
	if (size > 29) {
		console.log('file too large: ' + size);
		return false
	}

	return true;
}

function _checkFile(file) {

	if (!file) {
		return false;
	}

	return _checkFileSize(file)
		&& _checkFileType(file)
		;
}

@Component({
	selector: 'product-images',
	template: template,
	providers: [ProductImagesService]
})
class ProductImagesComponent {
	constructor(route, productImagesService) {
		this.productId = route.parent.params.value.id;
		this._productImagesService = productImagesService;
		this._images = [];
	}

	ngOnInit() {
		this._productImagesService.get(this.productId)
			.then((data) => {
				console.log(data);
				this._images = data;
			});
	}

	onFileDropped(files) {

		console.log(files);

		let i = files.length;

		while (i--) {

			this.addFile(files[i]);
		}
	}

	addFile(file) {

		if (!_checkFile(file)) {
			return;
		}

		let fd = new FormData();
		fd.append('file', file);

		//refactor this
		file.id = '_temp';
		this._productImagesService.upload(this.productId, fd)
			.then(res => {
				this._images.push(res)
			})
			.catch((res) => {
				console.log(res);
				console.log('file too large: ' + size);
				this._deleteFile(file.id);
			});
	}

	onDeleteClick(event, id) {

		event.stopPropagation();

		if (!confirm('Удалить?')) {
			return;
		}

		event.stopPropagation();

		this._productImagesService.remove(id)
			.then(res => {
				this._deleteImage(id);
				//this._documentsService.remove(id);
			});

	}

	_deleteImage(id) {
		let i = this._images.length;
		while (i--) {
			if (this._images[i].id && this._images[i].id === id) {
				this._images.splice(i, 1);
				return;
			}
		}
	}
}

ProductImagesComponent.parameters = [
	ActivatedRoute,
	ProductImagesService
];

export default ProductImagesComponent;
