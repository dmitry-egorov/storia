'use strict';

module Rx
{
    export interface Observable<T>
    {
        $subscribe($scope, callback);
        $bindTo($scope, prop: string);
    }

    export interface ObservableStatic
    {
        prototype: any;
    }

    Observable.prototype.$subscribe = function ($scope, callback)
    {
        var subs = this.subscribe((data) =>
        {
            $scope.$evalAsync(() => callback(data));
        });

        $scope.$on('$destroy', () => subs.dispose());
    };

    Observable.prototype.$bindTo = function ($scope, prop)
    {
        this.$subscribe($scope, (data) => $scope[prop] = data);
    };
}

