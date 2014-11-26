'use strict';

angular.module('storiaApp').directive('stAuthorInfo',
        () =>
        {
            return {
                restrict: 'A',
                templateUrl: '/partials/stAuthorInfo.html',
                scope: {
                    profile: '='
                }
            };
        });
