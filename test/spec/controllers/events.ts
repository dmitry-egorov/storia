/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/controllers/events.ts" />

'use strict';

describe('Controller: EventsCtrl', () =>
{
    beforeEach(module('storiaApp'));

    var EventsCtrl, scope;
    var event = 1;
    var currentProfile = 2;

    beforeEach(inject(($controller, $rootScope) =>
    {
        scope = $rootScope.$new();

        EventsCtrl = new StoriaApp.EventsController(
                scope,
                {id: event},
                <StoriaApp.IEventsProvider>{getEventPromise: () => { return <ng.IPromise<any>>{then: (callback) => callback(event)};}},
                <StoriaApp.ProfileProvider>{currentObservable: () => { return {$subscribe: ($scope, callback) =>  callback(currentProfile)};}}
            );
    }));

    it('should attach an event to the scope', () =>
    {
        expect(scope.vm.event).toBe(event);
    });

    it('should attach a profile to the scope', () =>
    {
        expect(scope.vm.currentProfile).toBe(currentProfile);
    });
});
