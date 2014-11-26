/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />

'use strict';

describe('Controller: MainCtrl', function () {
    beforeEach(module('storiaApp'));

    var MainCtrl, scope;
    var events = 1;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl',
            {
                $scope: scope,
                eventsProvider: {
                    getHomeEventsPromise: function () {
                        return {
                            then: function (callback) {
                                callback(events);
                            }
                        };
                    }
                }
            });
    }));

    it('should attach events to the scope', function () {
        scope.moreEvents();
        expect(scope.events).toBe(events);
    });
});
