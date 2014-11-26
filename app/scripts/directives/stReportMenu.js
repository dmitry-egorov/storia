'use strict';

angular
    .module('storiaApp')
    .directive('stReportMenu', ['reportsStorage', 'profileProvider', 'reportsProvider', function (reportsStorage, profileProvider, reportsProvider) {
        return {
            restrict: 'A',
            templateUrl: '/partials/stReportMenu.html',
            scope: {
                report: '='
            },
            controller: function ($scope) {
                if (!$scope.report) {
                    return;
                }

                $scope.upvoted = false;
                var profileId;

                reportsProvider
                    .upvotedObservable($scope.report.id)
                    .$bindTo($scope, 'upvoted');

                reportsProvider
                    .votesObservable($scope.report.id)
                    .$subscribe($scope, function (count) {
                        $scope.report.votes = count;
                    });

                profileProvider
                    .currentObservable()
                    .$subscribe($scope, function (profile) {
                        profileId = (profile || {}).id;
                    });


                $scope.upvote = function (reportId) {
                    if (profileId) {
                        reportsStorage.upvote(reportId, profileId);
                    }
                    else {
                    }
                };
            }
        };
    }]);