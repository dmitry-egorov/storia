'use strict';

/**
 * Created by dmitrijegorov on 25/10/14.
 */
angular.module('storiaApp').filter('asReport', ['reportsProvider', function(reportsProvider) {
    return function(report)
    {
        if (!report)
        {
            return undefined;
        }

        if (typeof(report) !== 'string')
        {
            return report;
        }

        return reportsProvider.getBy(report);
    };
}]);
