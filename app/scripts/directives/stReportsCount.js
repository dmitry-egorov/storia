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
            countFunc: '&count'
        },
        controller: function($scope)
        {
            $scope.count = $scope.countFunc();
        }
    };
});