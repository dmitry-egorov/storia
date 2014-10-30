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
function ($scope, $routeParams, eventsProvider, profileProvider)
{
    var id = $routeParams.id;
    $scope.id = id;

    eventsProvider
    .getEventPromise(id)
    .then(function(event)
    {
        $scope.$evalAsync(function()
        {
            $scope.event = event;
        });
    });

    var subs =
    profileProvider
    .getCurrentProfileObservable()
    .subscribe(function(authorInfo)
    {
        $scope.$evalAsync(function()
        {
            $scope.currentProfile = authorInfo;
        });
    });

    $scope.$on('$destroy', function()
    {
        subs.dispose();
    });
}]);
