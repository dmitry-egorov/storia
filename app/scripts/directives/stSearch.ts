'use strict';

angular.module('storiaApp').directive('stSearch', ['$location',
    ($location: ng.ILocationService) =>
    {
        return {
            restrict: 'A',
            templateUrl: '/partials/stSearch.html',
            controller: ($scope) =>
            {
                $scope.text = '';
                $scope.search = () =>
                {
                    var text = $scope.text;
                    if(!text.trim())
                    {
                        return;
                    }

                    $location.path('/search/' + Encoder.encodeId(text));
                }
            }
        };
    }]);
