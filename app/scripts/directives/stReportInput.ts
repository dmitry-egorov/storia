'use strict';

module StoriaApp
{
    export class ReportInput
    {
        text: string;
        expanded: boolean;
        author;
        reported: boolean;
        mode: string;

        private event: Event;

        constructor(private $scope: ng.IScope, private reportsStorage: StoriaApp.ReportsStorage, private profileProvider: StoriaApp.ProfileProvider)
        {
            this.reported = false;
            this.text = '';
            this.expanded = false;

            profileProvider.currentProfileObservable().withScope($scope).subscribe(currentProfile =>
            {
                this.author = currentProfile;
                this.updateReported();
            });

            $scope.$watch('event', event => {
                this.event = event;
                this.updateReported();
            });

            $scope['vm'] = this;
        }

        expandReportInput(mode: string)
        {
            if(mode == 'add')
            {
                this.text = '';
            }
            else if(mode == 'edit')
            {
                var report = this.getOwnReport();
                this.text = report.content;
            }
            else
            {
                throw 'Invalid operation: no own report';
            }

            this.mode = mode;
            this.expanded = true;
        }

        addReport()
        {
            if (!this.text)
            {
                return;
            }

            var authorId = this.author.id;
            var eventId = this.event.id;

            this.reportsStorage.addReport(eventId, authorId, this.text);

            this.expanded = false;
            this.text = '';
        }

        editReport()
        {
            if (!this.text)
            {
                return;
            }

            var reportId = this.getOwnReport().id;

            this.reportsStorage.editReport(reportId, this.text);

            this.expanded = false;
            this.text = '';
        }

        cancel()
        {
            this.expanded = false;
        }

        private updateReported()
        {
            this.reported = this.getOwnReport() !== null;
        }

        private getOwnReport(): Report
        {
            if(!this.author)
            {
                return null;
            }

            if(!this.event)
            {
                return null;
            }

            return this.event.getReportOf(this.author.id);
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
