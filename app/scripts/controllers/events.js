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
    $scope.id = id;

    eventsProvider.getBy(id).$bindTo($scope, 'event');
}]);
