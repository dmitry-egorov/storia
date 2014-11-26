'use strict';

angular
    .module('storiaApp')
    .directive('stReportInput', ['ReportsStorage', function (reportsStorage: StoriaApp.ReportsStorage) {
        return {
            restrict: 'A',
            templateUrl: '/partials/stReportInput.html',
            scope: {
                eventId: '=',
                author: '='
            },
            controller: function ($scope) {
                $scope.text = '';
                $scope.expanded = false;

                $scope.expandReportInput = function () {
                    $scope.expanded = true;
                };

                $scope.tryAddReport = function (eventId, text) {
                    var authorId = $scope.author.id;
                    if (!authorId) {
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
