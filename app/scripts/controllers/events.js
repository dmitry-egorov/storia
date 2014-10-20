'use strict';

/**
 * @ngdoc function
 * @name storiaFrontendApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the storiaFrontendApp
 */
angular
.module('storiaApp')
.controller('EventsCtrl', ['$scope', '$routeParams', 'eventsProvider', function ($scope, $routeParams, eventsProvider)
{
    var id = +$routeParams.id;
    var event = eventsProvider.getBy(id);
    $scope.event = event;
}]);
