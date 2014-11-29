'use strict';

angular.module('storiaApp').directive('ngDisableOnEmpty',
    () =>
    {
        return {
            restrict: 'A',
            link: (scope: ng.IScope, element, attr) =>
            {
                scope.$watch(attr.ngDisableOnEmpty, (value: string) =>
                {
                    if(!value || value.trim() === '')
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
