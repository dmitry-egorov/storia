'use strict';

angular.module('storiaApp').directive('ngFallbackSrc', () =>
{
    return {
        link: (scope, iElement, iAttrs) =>
        {
            iElement.bind('error', function ()
            {
                angular.element(this).attr("src", iAttrs['ngFallbackSrc']);
            });
        }
    };
});
