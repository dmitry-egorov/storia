'use strict';

angular
.module('storiaApp')
.directive('stAuthorInfo', ['profileProvider', function (profileProvider)
{
    return {
        restrict: 'A',
        templateUrl: '/partials/stAuthorInfo.html',
        scope:
        {
            pid: '='
        },
        controller: function($scope)
        {
            var unwatch = $scope.$watch('pid', function (authorId)
            {
                if (!authorId)
                {
                    return;
                }

                profileProvider.getBy(authorId).$bindTo($scope, 'author');

                unwatch();
            });
        }
    };
}]);