'use strict';

angular.module('chance', []).factory('chance', function() {
    return window.chance;
});

angular.module('debug', []);
angular.module('utils', []);
angular.module('stServices', ['firebase.config', 'chance', 'utils', 'debug']);

/**
 * @ngdoc overview
 * @name storiaApp
 * @description
 * # storiaApp
 *
 * Main module of the application.
 */
angular
.module('storiaApp',
[
    'firebase',
    'debug',
    'utils',
    'firebase.config',
    'stServices',
    'chance',
    'underscore',
    'ngDialog',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
])
.config(function ($routeProvider)
{
    $routeProvider
    .when('/',
    {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .when('/events/:id',
    {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
    })
    .otherwise
    ({
        redirectTo: '/'
    });
})
.run(['$rootScope', '_', function($rootScope, _)
{
    $rootScope._ = _;
}]);
