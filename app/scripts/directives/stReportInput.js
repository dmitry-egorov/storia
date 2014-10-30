'use strict';

angular
.module('storiaApp')
.directive('stReportInput', ['reportsStorage', function (reportsStorage)
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stReportInput.html',
        scope:
        {
            eventId: '=',
            authorInfo: '='
        },
        controller: function($scope)
        {
            $scope.text = '';
            $scope.expanded = false;

            $scope.expandReportInput = function()
            {
                $scope.expanded = true;
            };

            $scope.tryAddReport = function(eventId, text)
            {
                var authorId = $scope.authorInfo.id;
                if (!authorId)
                {
                    return;
                }

                reportsStorage.addReport(eventId, authorId, text);

                $scope.expanded = false;
                $scope.text = '';

                return true;
            };
        }
    };
}]);