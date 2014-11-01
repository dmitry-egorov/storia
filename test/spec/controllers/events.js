'use strict';

describe('Controller: EventsCtrl', function ()
{
    beforeEach(module('storiaApp'));

    var EventsCtrl, scope;
    var event = 1;
    var currentProfile = 2;

    beforeEach(inject(function ($controller, $rootScope)
    {
        scope = $rootScope.$new();

        EventsCtrl = $controller('EventsCtrl',
        {
            $scope: scope,
            $routeParams: { id: event },
            eventsProvider: { getEventPromise: function() { return {then: function(callback) { callback(event); } };} },
            profileProvider: { currentObservable: function() { return {$bindTo: function($scope, prop) { $scope[prop] = currentProfile; } };} }
        });
    }));

    it('should attach an event to the scope', function ()
    {
        expect(scope.event).toBe(event);
    });

    it('should attach a profile to the scope', function ()
    {
        expect(scope.currentProfile).toBe(currentProfile);
    });
});
