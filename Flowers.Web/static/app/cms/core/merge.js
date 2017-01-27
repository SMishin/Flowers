export default function merge(target) {
    'use strict';

    if (typeof Object.assign == 'function') {
        return Object.assign.apply(this, arguments);
    }

    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (let index = 1; index < arguments.length; index++) {
        let source = arguments[index];
        if (source != null) {
            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }

    return target;
}
