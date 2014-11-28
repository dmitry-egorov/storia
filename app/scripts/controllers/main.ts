/// <reference path="../_all.ts" />

'use strict';

module StoriaApp
{
    export class MainController
    {
        public loading: boolean = false;
        public events: any = [];

        public static $inject = ['$scope', 'EventsProvider'];
        constructor($scope: ng.IScope, private eventsProvider: StoriaApp.IHomeProvider)
        {
            $scope['vm'] = this;
        }

        moreEvents()
        {
            this.loading = true;

            this.eventsProvider.getHomePromise().then((events) =>
            {
                this.events = events;
                this.loading = false;
            });
        }
    }
}
