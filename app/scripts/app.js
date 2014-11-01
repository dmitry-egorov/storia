'use strict';

angular.module('chance', []).factory('chance', function() {
    return window.chance;
});

angular.module('debug', []);
angular.module('utils', []);
angular.module('firebaseUtils', []);
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
    'firebaseUtils',
    'firebase.config',
    'stServices',
    'chance',
    'ngDialog',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngOrderObjectBy'
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
.run(['$rootScope', function($rootScope)
{
    $rootScope._ = _;
}]);
