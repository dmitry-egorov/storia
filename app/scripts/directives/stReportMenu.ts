'use strict';

module StoriaApp
{
    export class ReportMenu
    {
        public canUpvote: boolean;
        public report: Report;

        constructor($scope, private reportsStorage: StoriaApp.ReportsStorage, private profileProvider: StoriaApp.ProfileProvider, reportsProvider: StoriaApp.ReportsProvider)
        {
            $scope.$watch('report', report =>
            {
                this.report = report;

                if (!report)
                {
                    return;
                }

                reportsProvider.upvotedObservable(report.id).withScope($scope).subscribe(upvoted =>
                {
                    this.canUpvote = !upvoted;
                });

                reportsProvider.votesObservable(report.id).withScope($scope).subscribe((count) =>
                {
                    this.report.votes = count;
                });
            });

            $scope['vm'] = this;
        }

        upvote(reportId: string)
        {
            var profile = this.profileProvider.currentProfile();
            if (profile)
            {
                this.reportsStorage.upvote(reportId, profile.id);
            }
            else
            {
                //TODO: show registration dialog
            }
        }
    }
}

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
                new StoriaApp.ReportMenu($scope, reportsStorage, profileProvider, reportsProvider);
            }
        };
    }]);
