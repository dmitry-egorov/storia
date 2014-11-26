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

                $scope.upvoted = false;
                var profileId;

                reportsProvider.upvotedObservable($scope.report.id).$bindTo($scope, 'upvoted');

                reportsProvider.votesObservable($scope.report.id).$subscribe($scope, (count) =>
                {
                    $scope.report.votes = count;
                });

                profileProvider.currentObservable().$subscribe($scope, (profile) =>
                {
                    profileId = (profile || {}).id;
                });


                $scope.upvote = (reportId) =>
                {
                    if (profileId)
                    {
                        reportsStorage.upvote(reportId, profileId);
                    }
                    else
                    {
                    }
                };
            }
        };
    }]);
