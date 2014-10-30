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
    eventsProvider
    .getHomeEventsPromise()
    .then(function(events)
    {
        $scope.events = events;
    });
}]);
