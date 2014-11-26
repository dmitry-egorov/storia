'use strict';

angular
    .module('storiaApp')
    .directive('stReport', function () {
        return {
            restrict: 'A',
            templateUrl: '/partials/stReport.html',
            scope: {
                report: '='
            }
        };
    });