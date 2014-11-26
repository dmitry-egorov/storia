'use strict';

/**
 * @ngdoc function
 * @name storiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the storiaApp
 */
angular.module('storiaApp').controller('MainCtrl', ['$scope', 'EventsProvider',
    ($scope, eventsProvider: StoriaApp.EventsProvider) =>
    {
        $scope.loading = false;
        $scope.moreEvents = function ()
        {
            $scope.loading = true;

            eventsProvider.getHomeEventsPromise().then((events) =>
            {
                $scope.events = events;
                $scope.loading = false;
            });
        };
    }]);
