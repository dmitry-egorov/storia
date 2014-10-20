'use strict';

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
    'angular-underscore',
    'components',
    'eventsProvider',
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
//.run(['$rootScope', '_', function($rootScope, _)
//{
//    $rootScope._ = _;
//}])
;
