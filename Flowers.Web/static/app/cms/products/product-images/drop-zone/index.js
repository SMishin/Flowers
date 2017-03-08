import {Directive, EventEmitter, ElementRef} from '@angular/core';

@Directive({
	selector: '[drop-zone]',
	inputs: ['dragOverClass'],
	outputs: ['onFileDropped'],
	host: {
		'(dragenter)': 'onDragenter($event)',
		'(dragleave)': 'onDragleave($event)',
		'(dragover)': 'onDragover($event)',
		'(drop)': 'onDrop($event)'
	}
})
class DropZoneDirective {

	set dragOverClass(value) {
		this._dragOverClass = value;
	}

	constructor(el) {
		this._el = el.nativeElement;
		this.onFileDropped = new EventEmitter();
	}

	onDragenter(e) {
		//console.log(e);
		this._el.classList.add(this._dragOverClass);
		e.stopPropagation();
		e.preventDefault();
	}

	onDragleave(e) {
		this._el.classList.remove(this._dragOverClass);
		e.stopPropagation();
		e.preventDefault();
	}

	onDragover(e) {
	//	console.log(e.dataTransfer.items[0]);
		//console.log(e.dataTransfer.types);
		e.stopPropagation();
		e.preventDefault();
	}

	onDrop(e) {
		this._el.classList.remove(this._dragOverClass);
		e.stopPropagation();
		e.preventDefault();
		this.onFileDropped.emit(e.dataTransfer.files);
	}
}

DropZoneDirective.parameters = [
	ElementRef
];

export default DropZoneDirective;
