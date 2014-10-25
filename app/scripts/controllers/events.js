'use strict';

/**
 * @ngdoc function
 * @name storiaApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the storiaApp
 */
angular
.module('storiaApp')
.controller('EventsCtrl', ['$scope', '$routeParams', 'eventsProvider', function ($scope, $routeParams, eventsProvider)
{
    var id = $routeParams.id;
    var event = eventsProvider.getBy(id);

    $scope.id = id;
    $scope.event = event;
}]);
