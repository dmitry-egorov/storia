'use strict';

angular.module('storiaApp').directive('stReport',
        () =>
        {
            return {
                restrict: 'A',
                templateUrl: '/partials/stReport.html',
                scope: {
                    report: '='
                }
            };
        });
