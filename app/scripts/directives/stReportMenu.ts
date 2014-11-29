'use strict';

module StoriaApp
{
    export class ReportMenu
    {
        public upvoted: boolean;
        public report: Report;
        public disabled: boolean;

        constructor($scope, private reportsStorage: StoriaApp.ReportsStorage, private profileProvider: StoriaApp.ProfileProvider, reportsProvider: StoriaApp.ReportsProvider)
        {
            this.disabled = true;
            this.upvoted = false;

            var subscription = $scope.$watch('report', report =>
            {
                this.report = report;

                if (!report)
                {
                    return;
                }

                reportsProvider.watchUpvote(report.id).withScope($scope).subscribe(status =>
                {
                    this.setFlagsForStatus(status);
                });

                reportsProvider.watchVotesCount(report.id).withScope($scope).subscribe((count) =>
                {
                    this.report.votes = count;
                });

                subscription();
            });

            $scope['vm'] = this;
        }

        upvote(reportId: string)
        {
            var profile = this.profileProvider.currentProfile();
            if (profile)
            {
                this.reportsStorage.upvote(reportId);
            }
            else
            {
                //TODO: show registration dialog
            }
        }

        private setFlagsForStatus(status)
        {
            switch (status)
            {
                case UpvoteStatus.NonUpvoted:
                {
                    this.disabled = false;
                    this.upvoted = false;
                    break;
                }
                case UpvoteStatus.Upvoted:
                {
                    this.disabled = false;
                    this.upvoted = true;
                    break;
                }
                case UpvoteStatus.Owner:
                {
                    this.disabled = true;
                    this.upvoted = false;
                    break;
                }
                default:
                    throw 'Unknown upvote status';
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
