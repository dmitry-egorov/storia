'use strict';

/**
 * Created by dmitrijegorov on 25/10/14.
 */
angular
.module('storiaApp')
.filter('count', ['_', function(_)
{
    return function(obj)
    {
        if(!obj)
        {
            return 0;
        }

        return _(Object.keys(obj))
        .filter(function(s)
        {
            return s[0] !== '$';
        })
        .length;
    };
}]);