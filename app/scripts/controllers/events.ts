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
    .controller('EventsCtrl', ['$scope', '$routeParams', 'eventsProvider', 'profileProvider',
        function ($scope, $routeParams, eventsProvider, profileProvider) {
            var id = $routeParams.id;

            eventsProvider
                .getEventPromise(id)
                .then(function (event) {
                    $scope.event = event;
                });

            profileProvider
                .currentObservable()
                .$bindTo($scope, 'currentProfile');
        }]);
