'use strict';

angular
    .module('storiaApp')
    .directive('stAuthorInfo', function () {
        return {
            restrict: 'A',
            templateUrl: '/partials/stAuthorInfo.html',
            scope: {
                profile: '='
            }
        };
    });