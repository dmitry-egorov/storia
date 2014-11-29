'use strict';

angular.module('storiaApp').directive('stHeader', ['ngDialog', 'ProfileProvider', 'Authenticator',
    (ngDialog, profileProvider: StoriaApp.ProfileProvider, authenticator: StoriaApp.Authenticator) =>
    {
        return {
            restrict: 'A',
            templateUrl: '/partials/stHeader.html',
            controller: ($scope) =>
            {
                profileProvider.watchCurrentProfile().withScope($scope).subscribe((profile) =>
                {
                    $scope.name = (profile || {}).name;
                });

                $scope.addEvent = () =>
                {
                    ngDialog.open({
                        template: 'views/addEvent.html',
                        controller: 'AddEventCtrl'
                    });
                };

                $scope.login = (provider) =>
                {
                    authenticator.authWith(provider);
                };

                $scope.logout = () =>
                {
                    authenticator.unauth();
                };
            }
        };
    }]);
