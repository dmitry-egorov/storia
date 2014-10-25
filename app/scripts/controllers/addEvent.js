'use strict';

/**
 * @ngdoc function
 * @name storiaApp.controller:AddEventCtrl
 * @description
 * # AddEventCtrl
 * Controller of the storiaApp
 */
angular
.module('storiaApp')
.controller('AddEventCtrl', ['$scope', 'eventsProvider', function ($scope, eventsProvider)
{
    $scope.title = '';
    $scope.tryAddEvent = function()
    {
        eventsProvider.addEvent({title: $scope.title});

        return true;
    };
}]);
