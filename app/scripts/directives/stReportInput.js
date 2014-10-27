'use strict';

angular
.module('storiaApp')
.directive('stReportInput', ['reportsStorage', 'profileProvider', function (reportsStorage, profileProvider)
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stReportInput.html',
        scope:
        {
            eventId: '=eventId'
        },
        controller: function($scope)
        {
            profileProvider.getCurrentId(function(profile)
            {
                $scope.$evalAsync(function()
                {
                    $scope.currentProfileId = profile;
                });
            });

            $scope.text = '';
            $scope.expanded = false;

            $scope.expandReportInput = function()
            {
                $scope.expanded = true;
            };

            $scope.tryAddReport = function(eventId, text)
            {
                profileProvider.getCurrentId(function(profileId)
                {
                    if (!profileId)
                    {
                        return;
                    }

                    $scope.$evalAsync(function()
                    {
                        reportsStorage.addReport(eventId, profileId, text);

                        $scope.expanded = false;
                        $scope.text = '';
                    });
                });

                return true;
            };
        }
    };
}]);