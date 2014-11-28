'use strict';

angular.module('storiaApp').directive('stReportInput', ['ReportsStorage', 'ProfileProvider',
    (reportsStorage: StoriaApp.ReportsStorage, profileProvider: StoriaApp.ProfileProvider) =>
    {
        return {
            restrict: 'A',
            templateUrl: '/partials/stReportInput.html',
            scope: {
                eventId: '='
            },
            controller: ($scope) =>
            {
                $scope.text = '';
                $scope.expanded = false;

                profileProvider.currentProfileObservable().withScope($scope).subscribe(currentProfile =>
                {
                   $scope.author = currentProfile;
                });

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
