/// <reference path="../_all.ts" />

'use strict';

module StoriaApp
{
    export class SearchController
    {
        public events: any = [];
        public disableInfiniteScroll = true;

        public static $inject = ['$scope', '$routeParams', 'Searcher'];
        constructor($scope: ng.IScope, $routeParams: any, searcher: StoriaApp.Searcher)
        {
            $scope['vm'] = this;

            var query = Encoder.decodeId($routeParams.query);

            searcher.searchPromise(query).then((events) =>
            {
                this.events = events;
            })
            .catch(cause => console.warn(cause));
        }
    }
}
