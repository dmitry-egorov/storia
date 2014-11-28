/// <reference path="../_all.ts" />

'use strict';

module StoriaApp
{
    export class EventsController
    {
        private event;
        private currentProfile;

        public static $inject = ['$scope', '$routeParams', 'EventsProvider'];
        constructor($scope: ng.IScope, $routeParams: any, eventsProvider: StoriaApp.IEventsProvider)
        {
            $scope['vm'] = this;
            var id: string = $routeParams.id;

            eventsProvider.getEventPromise(id).then((event) => this.event = event);
        }
    }
}
