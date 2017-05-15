import {Directive, EventEmitter, ElementRef} from '@angular/core';

@Directive({
    selector: '[file-browser]',
    outputs: ['onFileSelected'],
    host: {
        '(click)': 'onClick($event)'
    }
})
class FileBrowserDirective {

    set dragOverClass(value) {
        this._dragOverClass = value;
        this._file = null;
    }

    constructor(el) {
        this._el = el.nativeElement;
        this.onFileSelected = new EventEmitter();
    }

    onClick(e) {
        this._file.click();
    }

    ngOnInit() {
        let _this = this,
            file = document.createElement('input');

        file.type = 'file';
        file.style.display = 'none';

        file.onchange = function () {
            _this.onFileSelected.emit(this.files[0]);
	        this.value = null;
        };

        this._el.appendChild(file);
        this._file = file;
    }

}

FileBrowserDirective.parameters = [
    ElementRef
];

export default FileBrowserDirective;