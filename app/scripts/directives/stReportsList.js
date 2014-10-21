'use strict';

angular
.module('storiaApp')
.directive('stReportsList', function ()
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stReportsList.html',
        scope:
        {
            reportsFunc: '&reports'
        },
        controller: function($scope)
        {
            $scope.reports = $scope.reportsFunc();
        }
    };
});