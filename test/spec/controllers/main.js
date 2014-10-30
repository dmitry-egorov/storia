'use strict';

describe('Controller: MainCtrl', function ()
{
    beforeEach(module('storiaApp'));

    var MainCtrl, scope;
    var events = 1;

    beforeEach(inject(function ($controller, $rootScope)
    {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl',
        {
            $scope: scope,
            eventsProvider:
            {
                getHomeEventsPromise: function() { return { then: function(callback){ callback(events); } }; }
            }
        });
    }));

    it('should attach a events to the scope', function ()
    {
        expect(scope.events).toBe(events);
    });
});
