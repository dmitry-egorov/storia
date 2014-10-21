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
.controller('MainCtrl', ['$scope', 'eventsProvider', '_', function ($scope, eventsProvider, _)
{
    var events = eventsProvider.getAll();
    $scope.events = events;

    $scope.firstOf = function (reports)
    {
        return _(reports).take(1);
    };
}]);
