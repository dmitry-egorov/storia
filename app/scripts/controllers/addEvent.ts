'use strict';

/**
 * @ngdoc function
 * @name storiaApp.controller:AddEventCtrl
 * @description
 * # AddEventCtrl
 * Controller of the storiaApp
 */
angular.module('storiaApp').controller('AddEventCtrl', ['$scope', 'EventsStorage', '$location',
    ($scope, eventsStorage: StoriaApp.EventsStorage, $location)=>
    {
        $scope.title = '';
        $scope.tryAddEvent = (title) =>
        {
            eventsStorage.addEventPromiseId(title).then((id) =>
            {
                $location.path('/events/' + id);
            });

            return true;
        };
    }]);
