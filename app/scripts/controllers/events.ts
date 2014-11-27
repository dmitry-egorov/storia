/// <reference path="../_all.ts" />

'use strict';

module StoriaApp
{
    export class EventsController
    {
        private event;
        private currentProfile;

        public static $inject = ['$scope', '$routeParams', 'EventsProvider', 'ProfileProvider'];
        constructor($scope, $routeParams, private eventsProvider: StoriaApp.IEventsProvider, private profileProvider: StoriaApp.ProfileProvider)
        {
            $scope.vm = this;
            var id = $routeParams.id;

            eventsProvider.getEventPromise(id).then((event) => this.event = event);
            profileProvider.currentObservable().$subscribe($scope, p => this.currentProfile = p);
        }
    }
}
