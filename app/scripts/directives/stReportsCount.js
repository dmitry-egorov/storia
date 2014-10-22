'use strict';

angular
.module('storiaApp')
.directive('stReportsCount', function ()
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stReportsCount.html',
        scope:
        {
            count: '=count'
        }
    };
});