'use strict';

angular.module('storiaApp').directive('stReportsCount',
        () =>
        {
            return {
                restrict: 'A',
                templateUrl: '/partials/stReportsCount.html',
                scope: {
                    count: '=count'
                }
            };
        });
