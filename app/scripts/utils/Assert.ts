'use strict';

module Assert {
    export function defined(val:any) {
        if (val === undefined || val === null) {
            throw 'Value must be defined';
        }
    }
}
