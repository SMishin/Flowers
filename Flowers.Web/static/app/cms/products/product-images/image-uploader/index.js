import {Component} from '@angular/core';
import FileService from '../file-service';
import template from './template.html'

let types = ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf'];

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
	selector: 'image-uploader',
	template: template,
	providers: [FileService]
})
class ImageUploaderComponent {
	constructor(fileService) {
		this._fileService = fileService;
		this._files = [];
	}

	ngOnInit() {
		//this._updateDocs();
		//this._documentsService.addListener(this._updateDocs, this);
	}

	_updateDocs() {
		// if (this._documentsService.getDocs().length == 0) {
		// 	this._files = [];
		// }
	}

	onFileDropped(file) {

		console.log(file);

		if (!_checkFile(file)) {
			return;
		}

		let fd = new FormData();
		fd.append('file', file);

		//refactor this
		file.id = '_temp';
		this._files.push(file);
		this._fileService.upload(fd)
			.then(res => {
				let fileId = res;
				file.uploaded = true;
				file.id = fileId;
			})
			.catch((res)=> {
				console.log(res);
				console.log('file too large: ' + size);
				this._deleteFile(file.id);
			});
	}

	onDeleteClick(event, item) {
		event.stopPropagation();
		let id = item.id;
		this._fileService.remove(id)
			.then(res => {
				this._deleteFile(id);
				//this._documentsService.remove(id);
			});

	}

	_deleteFile(id) {
		let i = this._files.length;
		while (i--) {
			if (this._files[i].id && this._files[i].id === id) {
				this._files.splice(i, 1);
				return;
			}
		}
	}
}

ImageUploaderComponent.parameters = [
	FileService
];

export default ImageUploaderComponent;
