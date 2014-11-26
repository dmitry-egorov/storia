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
        .controller('EventsCtrl', ['$scope', '$routeParams', 'EventsProvider', 'ProfileProvider',
            function ($scope, $routeParams, eventsProvider: StoriaApp.EventsProvider, profileProvider: StoriaApp.ProfileProvider)
            {
                var id = $routeParams.id;

                eventsProvider
                        .getEventPromise(id)
                        .then(function (event)
                        {
                            $scope.event = event;
                        });

                profileProvider
                        .currentObservable()
                        .$bindTo($scope, 'currentProfile');
            }]);
