'use strict';

/**
 * Created by dmitrijegorov on 25/10/14.
 */
angular.module('storiaApp').filter('previewReport', function() {
    return function(event)
    {
        return event.reports[event.previewReportId];
    };
});
