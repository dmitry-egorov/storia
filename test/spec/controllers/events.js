'use strict';

describe('Controller: EventsCtrl', function ()
{
    beforeEach(module('storiaApp'));

    var EventsCtrl, scope;
    var event = 1;

    beforeEach(inject(function ($controller, $rootScope)
    {
        scope = $rootScope.$new();
        EventsCtrl = $controller('EventsCtrl',
        {
            $scope: scope,
            $routeParams: { id: event },
            eventsProvider: { getEventPromise: function() { return {then: function(callback) { callback(event); } };} }
        });
    }));

    it('should attach an event to the scope', function ()
    {
        expect(scope.id).toBe(event);
    });
});
