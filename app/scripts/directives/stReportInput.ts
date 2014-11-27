'use strict';

angular.module('storiaApp').directive('stReportInput', ['ReportsStorage',
    (reportsStorage: StoriaApp.ReportsStorage) =>
    {
        return {
            restrict: 'A',
            templateUrl: '/partials/stReportInput.html',
            scope: {
                eventId: '=',
                author: '='
            },
            controller: ($scope) =>
            {
                $scope.text = '';
                $scope.expanded = false;

                $scope.expandReportInput = () =>
                {
                    $scope.expanded = true;
                    $scope.focused = true;
                };

                $scope.tryAddReport = (eventId, text) =>
                {
                    var authorId = $scope.author.id;
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
