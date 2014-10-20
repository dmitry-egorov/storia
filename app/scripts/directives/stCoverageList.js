'use strict';

angular
.module('components', ['underscore'])
.directive('stCoverageList', function ()
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stCoverageList.html',
        scope:
        {
            coveragesFunc: '&coverages'
        },
        controller: function($scope)
        {
            $scope.coverages = $scope.coveragesFunc();
        }
    };
});