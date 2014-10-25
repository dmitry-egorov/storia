'use strict';

/**
 * Created by dmitrijegorov on 25/10/14.
 */
angular.module('storiaApp').filter('count', function() {
    return function(obj)
    {
        return Object.keys(obj).length;
    };
});