'use strict';

module StoriaApp
{
    export class ReportInput
    {
        text: string;
        expanded: boolean;
        author;
        reported: boolean;

        private event;

        constructor(private $scope: ng.IScope, private reportsStorage: StoriaApp.ReportsStorage, private profileProvider: StoriaApp.ProfileProvider)
        {
            this.reported = false;
            this.text = '';
            this.expanded = false;

            profileProvider.currentProfileObservable().withScope($scope).subscribe(currentProfile =>
            {
                this.author = currentProfile;
                this.updatedReported(currentProfile);
            });

            $scope.$watch('event', event => {
                this.event = event;
                this.updatedReported(this.author);
            });

            $scope['vm'] = this;
        }

        expandReportInput()
        {
            this.expanded = true;
        }

        tryAddReport()
        {
            if (!this.text)
            {
                return;
            }

            if(!this.event)
            {
                return;
            }

            var authorId = this.author.id;
            if (!authorId)
            {
                return;
            }

            this.reportsStorage.addReport(this.event.id, authorId, this.text);

            this.expanded = false;
            this.text = '';

            return true;
        }

        private updatedReported(currentProfile)
        {
            this.reported = this.hasReported(currentProfile);
        }

        private hasReported(currentProfile): boolean
        {
            if(!currentProfile)
            {
                return false;
            }

            if(!this.event)
            {
                return false;
            }

            return this.event.isCoveredBy(currentProfile.id);
        }
    }
}


angular.module('storiaApp').directive('stReportInput', ['ReportsStorage', 'ProfileProvider',
    (reportsStorage: StoriaApp.ReportsStorage, profileProvider: StoriaApp.ProfileProvider) =>
    {
        return {
            restrict: 'A',
            templateUrl: '/partials/stReportInput.html',
            scope: {
                event: '='
            },
            controller: ($scope) =>
            {
                new StoriaApp.ReportInput($scope, reportsStorage, profileProvider);
            }
        };
    }]);
