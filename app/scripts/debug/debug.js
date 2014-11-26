'use strict';

angular
    .module('debug')
    .service('fbDebug', function () {
        this.watchValue = function (ref, message) {
            if (!ref) {
                return;
            }

            ref.on('value', function (snap) {
                console.log(message, snap.name(), snap.val());
            });
        };
    });
