'use strict';

angular
.module('storiaApp')
.directive('stHeader', ['ngDialog', '$firebase', 'FBURL', 'userStorage', function (ngDialog, $firebase, FBURL, userStorage)
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stHeader.html',
        controller: function($scope)
        {
            var ref = new Firebase(FBURL);

            $scope.isLoggedIn = false;
            $scope.name = '';

            ref.onAuth(function(authData)
            {
                $scope.$evalAsync(function()
                {
                    if (authData)
                    {
                        $scope.isLoggedIn = true;
                        $scope.name = authData.facebook.displayName;

                        var provider = authData.provider;
                        var providerData = authData[provider];
                        userStorage.tryCreateUser(authData.uid, provider, providerData, providerData.displayName);
                    }
                    else
                    {
                        $scope.isLoggedIn = false;
                        $scope.name = '';
                    }
                });
            });


            $scope.addEvent = function()
            {
                ngDialog.open(
                {
                    template: 'views/addEvent.html',
                    controller: 'AddEventCtrl'
                });
            };

            $scope.fbLogin = function()
            {
                ref.authWithOAuthPopup('facebook', function() {});
            };

            $scope.logout = function()
            {
                ref.unauth();
            };
        }
    };
}]);