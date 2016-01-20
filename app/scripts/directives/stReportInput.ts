'use strict';

module StoriaApp
{
    export class ReportInput
    {
        reported: boolean;
        expanded: boolean;

        constructor
        (private eventId: string,
         private $scope: ng.IScope,
         private profileProvider: StoriaApp.ProfileProvider,
         private reportsProvider: StoriaApp.ReportsProvider)
        {
            this.reported = false;

            this.subscribe();
        }

        expand()
        {
            if (!this.profileProvider.getCurrentProfile())
            {
                //TODO: show registration
                return;
            }

            this.expanded = true;
        }

        collapse()
        {
            this.expanded = false;
        }

        private subscribe()
        {
            this.reportsProvider.watchReported(this.eventId).withScope(this.$scope).subscribe(reported =>
            {
                this.reported = reported;
            });

            this.profileProvider.watchCurrentProfile().withScope(this.$scope).subscribe(currentProfile =>
            {
                if (!currentProfile)
                {
                    this.expanded = false;
                }
            });
        }
    }

    export class ReportEditor
    {
        author;
        text: string;

        private draftThrottlingPeriod = 1000;

        constructor
        (private eventId: string,
         private publishCallback: () => void,
         private $scope: ng.IScope,
         private observeOnScope: ng.ObserveOnScope,
         private profileProvider: StoriaApp.ProfileProvider,
         private draftProvider: StoriaApp.DraftProvider,
         private draftStorage: StoriaApp.DraftStorage,
         private reportsStorage: StoriaApp.ReportsStorage)
        {
            var subscription: Rx.IDisposable;

            profileProvider.watchCurrentProfile().withScope($scope).subscribe(profile =>
            {
                if (subscription)
                {
                    subscription.dispose();
                }

                this.author = profile;

                if (!profile)
                {
                    return;
                }

                this.draftProvider.getDraftContent(this.eventId).then(draftContent =>
                {
                    this.text = draftContent;

                    subscription = this.subscribeToEdits();
                });
            });
        }

        publish()
        {
            this.reportsStorage.publish(this.eventId, this.text).then(() =>
            {
                this.publishCallback();
            });
        }

        private subscribeToEdits(): Rx.IDisposable
        {
            return this.observeOnScope(this.$scope, 'editor.text')
                .throttle(this.draftThrottlingPeriod)
                .map(change => change.newValue)
                .subscribe(newText =>
                {
                    this.draftStorage.updateDraft(this.eventId, newText);
                });
        }
    }
}

angular
    .module('storiaApp')
    .directive('stReportInput', ['observeOnScope', 'ReportsStorage', 'ProfileProvider', 'DraftStorage', 'DraftProvider', 'ReportsProvider',
        (observeOnScope,
         reportsStorage: StoriaApp.ReportsStorage,
         profileProvider: StoriaApp.ProfileProvider,
         draftStorage: StoriaApp.DraftStorage,
         draftProvider: StoriaApp.DraftProvider,
         reportsProvider: StoriaApp.ReportsProvider) =>
        {
            return {
                restrict: 'A',
                templateUrl: '/partials/stReportInput.html',
                scope: {
                    eventId: '=',
                    publish: '&'
                },
                controller: ($scope) =>
                {
                    var subscription = $scope.$watch('eventId', (eventId: string) =>
                    {
                        if (!eventId)
                        {
                            return;
                        }

                        var publish = $scope['publish'];

                        $scope['editor'] = new StoriaApp.ReportEditor(eventId, publish, $scope, observeOnScope, profileProvider, draftProvider, draftStorage, reportsStorage)
                        $scope['vm'] = new StoriaApp.ReportInput(eventId, $scope, profileProvider, reportsProvider);

                        subscription();
                    });

                }
            };
        }]);
