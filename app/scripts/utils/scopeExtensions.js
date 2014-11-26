'use strict';

Rx.Observable.prototype.$subscribe = function ($scope, callback) {
    var subs = this.subscribe(function (data) {
        $scope.$evalAsync(function () {
            callback(data);
        });
    });

    $scope.$on('$destroy', function () {
        subs.dispose();
    });
};

Rx.Observable.prototype.$bindTo = function ($scope, prop) {
    this.$subscribe($scope, function (data) {
        $scope[prop] = data;
    });
};

