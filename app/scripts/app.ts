/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../../typings/firebase/firebase-custom.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/rx/rx.d.ts" />
/// <reference path="../../typings/rx/rx.binding.d.ts" />
/// <reference path="services/authenticator.ts" />

'use strict';

angular.module('debug', []);
angular.module('utils', []);
angular.module('firebaseUtils', []);
angular.module('stServices', ['firebase.config', 'utils']);

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
            'utils',
            'firebase.config',
            'stServices',
            'ngDialog',
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ngOrderObjectBy',
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
        })
        .run(['$rootScope', function ($rootScope)
        {
            $rootScope._ = _;
        }]);
