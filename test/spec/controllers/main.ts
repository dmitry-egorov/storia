/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/controllers/main.ts" />
/// <reference path="../../mock/HomeProviderMock.ts" />

'use strict';

describe('Controller: MainCtrl', () =>
{
    beforeEach(module('storiaApp'));

    var MainCtrl, scope;
    var events = 1;

    beforeEach(inject(($controller, $rootScope) =>
    {
        scope = $rootScope.$new();
        var eventsProviderMock = new HomeProviderMock(events);

        MainCtrl = new StoriaApp.MainController(scope, eventsProviderMock);
    }));

    it('should attach events to the scope', () =>
    {
        scope.vm.moreEvents();
        expect(scope.vm.events).toBe(events);
    });
});
