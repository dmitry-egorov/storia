/// <reference path="../_all.ts" />

'use strict';

module StoriaApp
{
    export class MainController
    {
        public disableInfiniteScroll: boolean = false;
        public events: any = [];

        public static $inject = ['$scope', 'HomeProvider'];
        constructor($scope: ng.IScope, private eventsProvider: StoriaApp.IHomeProvider)
        {
            $scope['vm'] = this;
        }

        moreEvents()
        {
            this.disableInfiniteScroll = true;

            this.eventsProvider.getHomePromise().then((events) =>
            {
                this.events = events;
                this.disableInfiniteScroll = false;
            })
            .catch(cause => console.warn(cause));
        }
    }
}
