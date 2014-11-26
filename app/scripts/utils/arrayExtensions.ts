'use strict';
interface Array<T> {
    sortBy(key:string, desc:boolean): Array<T>;
    last():T;
}

Array.prototype.sortBy = function (key:string, desc:boolean) {
    function keysrt() {
        return function (a, b) {
            var less = desc ? (a[key] < b[key]) : (a[key] > b[key]);
            return less ? 1 : -1;
        };
    }

    return this.sort(keysrt());
};

Array.prototype.last = function () {
    return this[this.length - 1];
};


