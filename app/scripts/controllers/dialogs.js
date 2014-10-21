'use strict';

/**
 * @ngdoc function
 * @name storiaApp.controller:DialogsCtrl
 * @description
 * # DialogsCtrl
 * Controller of the storiaApp
 */
angular
.module('storiaApp')
.controller('DialogsCtrl', ['$scope', 'ngDialog', function ($scope, ngDialog)
{
    $scope.addEvent = function()
    {
        ngDialog.open(
        {
            template: 'views/addEvent.html',
            controller: 'AddEventCtrl'
        });
    };
}]);