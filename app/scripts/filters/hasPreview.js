'use strict';

/**
 * Created by dmitrijegorov on 25/10/14.
 */
angular.module('storiaApp').filter('hasPreview', function() {
    return function(event)
    {
        return event.previewReportId !== undefined;
    };
});