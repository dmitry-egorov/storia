'use strict';

angular.module('storiaApp').directive('stReportMenu', ['ReportsStorage', 'ProfileProvider', 'ReportsProvider',
    (reportsStorage: StoriaApp.ReportsStorage, profileProvider: StoriaApp.ProfileProvider, reportsProvider: StoriaApp.ReportsProvider) =>
    {
        return {
            restrict: 'A',
            templateUrl: '/partials/stReportMenu.html',
            scope: {
                report: '='
            },
            controller: ($scope) =>
            {
                if (!$scope.report)
                {
                    return;
                }

                $scope.upvoted = true;

                reportsProvider.upvotedObservable($scope.report.id).withScope($scope).subscribe(upvoted =>
                {
                    $scope.upvoted = upvoted;
                });

                reportsProvider.votesObservable($scope.report.id).withScope($scope).subscribe((count) =>
                {
                    $scope.report.votes = count;
                });

                $scope.upvote = (reportId) =>
                {
                    var profile = profileProvider.currentProfile();
                    if (profile)
                    {
                        reportsStorage.upvote(reportId, profile.id);
                    }
                    else
                    {
                        //TODO: show registration dialog
                    }
                };
            }
        };
    }]);
