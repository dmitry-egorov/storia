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
.controller('MainCtrl', ['$scope', 'eventsProvider', function ($scope, eventsProvider)
{
    var events = eventsProvider.getAll();
    $scope.events = events;

//    $scope.previewFor = function(event)
//    {
//        return event.reports[event.previewReportId];
//    };
//
//    $scope.hasPreview = function(event)
//    {
//        return event.previewReportId !== undefined;
//    };
}]);
