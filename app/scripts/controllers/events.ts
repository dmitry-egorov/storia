/// <reference path="../_all.ts" />

'use strict';

module StoriaApp
{
    export class EventsController
    {
        event: Event;

        private eventId: string;

        public static $inject = ['$scope', '$routeParams', 'EventsProvider'];
        constructor($scope: ng.IScope, $routeParams: any, private eventsProvider: StoriaApp.IEventsProvider)
        {
            this.eventId = $routeParams.id;

            this.loadEvents();

            $scope['vm'] = this;
        }

        public loadEvents()
        {
            this.eventsProvider.getEventPromise(this.eventId).then((event) =>
            {
                this.event = event;
            });
        }
    }
}
