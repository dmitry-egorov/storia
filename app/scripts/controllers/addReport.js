'use strict';

/**
 * @ngdoc function
 * @name storiaApp.controller:AddReportCtrl
 * @description
 * # AddReportCtrl
 * Controller of the storiaApp
 */
angular
.module('storiaApp')
.controller('AddReportCtrl', ['$scope', 'eventsProvider', function ($scope, eventsProvider)
{
    $scope.text = '';
    $scope.tryAddReport = function(eventId)
    {
        var report =
        {
            author:
            {
                image: 'http://www.washingtonpost.com/wp-apps/imrs.php?src=http://www.washingtonpost.com/blogs/the-switch/files/2014/05/hayleyheadshot.jpg&w=32&h=32',
                name: 'Hayley Tsukayama',
                publisherName: 'The Washington Post'
            },
            preview: $scope.text
        };

        eventsProvider.addReport(eventId, report);
        return true;
    };
}]);
