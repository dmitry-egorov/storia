'use strict';


if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
}

if (!Array.prototype.sortBy) {

    Array.prototype.sortBy = function (key, desc) {
        function keysrt() {
            return function (a, b) {
                var less = desc ? (a[key] < b[key]) : (a[key] > b[key]);
                return less ? 1 : -1;
            };
        }

        return this.sort(keysrt());
    };
}

if (!Object.values) {
    Object.values = function (obj) {
        var values = [];

        for (var key in obj) {
            values.push(obj[key]);
        }

        return values;
    };
}