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
.controller('AddEventCtrl', ['$scope', 'eventsStorage', '$location', function ($scope, eventsStorage, $location)
{
    $scope.title = '';
    $scope.tryAddEvent = function(title)
    {
        eventsStorage
        .addEventPromiseId(title)
        .then(function(id) { $location.path('/events/' + id); });

        return true;
    };
}]);
