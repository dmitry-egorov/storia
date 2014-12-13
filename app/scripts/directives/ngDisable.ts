'use strict';

angular.module('storiaApp').directive('ngDisable',
    () =>
    {
        return {
            restrict: 'A',
            link: (scope: ng.IScope, element, attr) =>
            {
                scope.$watch(attr.ngDisable, (value: boolean) =>
                {
                    if(value)
                    {
                        attr.$addClass('disabled');
                    }
                    else
                    {
                        attr.$removeClass('disabled');
                    }
                });
            }
        }
    });
