'use strict';

/**
 * @ngdoc function
 * @name storiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the storiaApp
 */
angular
.module('storiaApp')
.controller('MainCtrl', ['$scope', 'eventsProvider', function ($scope, eventsProvider)
{
    $scope.loading = false;
    $scope.moreEvents = function()
    {
        $scope.loading = true;

        eventsProvider
        .getHomeEventsPromise()
        .then(function(events)
        {
            $scope.events = events;
            $scope.loading = false;
        });
    };
}]);
