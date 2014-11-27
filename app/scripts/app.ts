/// <reference path="_all.ts" />

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
        'firebase',
        'firebase.config',
        'ngDialog',
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ngWig',
        'infinite-scroll'
    ])
    .service('Authenticator', StoriaApp.Authenticator)
    .service('EventsProvider', StoriaApp.EventsProvider)
    .service('EventsStorage', StoriaApp.EventsStorage)
    .service('ProfileProvider', StoriaApp.ProfileProvider)
    .service('ReportsProvider', StoriaApp.ReportsProvider)
    .service('ReportsStorage', StoriaApp.ReportsStorage)
    .service('UserStorage', StoriaApp.UserStorage)
    .service('ViewGenerator', FirebaseUtils.ViewGenerator)
    .controller('MainCtrl', StoriaApp.MainController)
    .controller('EventsCtrl', StoriaApp.EventsController)
    .config(function ($routeProvider: ng.route.IRouteProvider)
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
            .otherwise({
                redirectTo: '/'
            });
    });
