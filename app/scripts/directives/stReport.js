'use strict';

angular
.module('storiaApp')
.directive('stReport', ['reportsProvider', function(reportsProvider)
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stReport.html',
        scope:
        {
            rid: '='
        },
        controller: function($scope)
        {
            var unwatch = $scope.$watch('rid', function(reportId)
            {
                if(!reportId)
                {
                    return;
                }

                reportsProvider.getBy(reportId).$bindTo($scope, 'report');

                unwatch();
            });
        }
    };
}]);