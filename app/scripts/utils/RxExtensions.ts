'use strict';

module Rx
{
    export interface Observable<T> {
        $subscribe($scope, callback);
        $bindTo($scope, prop: string);
    }

    export interface ObservableStatic {
        prototype: any;
    }

    Observable.prototype.$subscribe = function ($scope, callback) {
        var subs = this.subscribe(function (data) {
            $scope.$evalAsync(function () {
                callback(data);
            });
        });

        $scope.$on('$destroy', function () {
            subs.dispose();
        });
    };

    Observable.prototype.$bindTo = function ($scope, prop) {
        this.$subscribe($scope, function (data) {
            $scope[prop] = data;
        });
    };
}

