'use strict';

module StoriaApp
{
    export class ReportMenu
    {
        upvoted: boolean;
        disabled: boolean;
        reportVotes: number;

        constructor(private reportId: any, $scope: ng.IScope, private reportsStorage: StoriaApp.ReportsStorage, private profileProvider: StoriaApp.ProfileProvider, reportsProvider: StoriaApp.ReportsProvider)
        {
            this.disabled = true;
            this.upvoted = false;

            reportsProvider.watchUpvote(reportId.own).withScope($scope).subscribe(status =>
            {
                this.setFlagsForStatus(status);
            });

            reportsProvider.watchVotesCount(reportId.own).withScope($scope).subscribe((count) =>
            {
                this.reportVotes = count;
            });
        }

        upvote()
        {
            var profile = this.profileProvider.getCurrentProfile();
            if (profile)
            {
                var cast = !this.upvoted;
                this.setFlagsForStatus(UpvoteStatus.Waiting);
                this.reportsStorage.upvote(this.reportId, cast);
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
                case UpvoteStatus.Waiting:
                {
                    this.disabled = true;
                    this.upvoted = true;
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
                reportId: '='
            },
            controller: ($scope) =>
            {
                var subscription = $scope.$watch('reportId', reportId =>
                {
                    if (!reportId)
                    {
                        return;
                    }

                    $scope['vm'] = new StoriaApp.ReportMenu(reportId, $scope, reportsStorage, profileProvider, reportsProvider);;

                    subscription();
                });


            }
        };
    }]);
