'use strict';

angular
.module('storiaApp')
.directive('stHeader', ['ngDialog', 'profileProvider', 'authenticator', function (ngDialog, profileProvider, authenticator)
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stHeader.html',
        controller: function($scope)
        {
            profileProvider
            .currentObservable()
            .$subscribe($scope, function(profile)
            {
                $scope.name = (profile || {}).name;
            });

            $scope.addEvent = function()
            {
                ngDialog.open(
                {
                    template: 'views/addEvent.html',
                    controller: 'AddEventCtrl'
                });
            };

            $scope.login = function(provider)
            {
                authenticator.authWith(provider);
            };

            $scope.logout = function()
            {
                authenticator.unauth();
            };
        }
    };
}]);