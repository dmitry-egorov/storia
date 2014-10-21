'use strict';

describe('Controller: EventsCtrl', function () {

  // load the controller's module
  beforeEach(module('storiaApp'));

  var EventsCtrl,
    scope;
  var event = 1;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventsCtrl = $controller('EventsCtrl', {
      $scope: scope,
      $routeParams: { id: '1' },
      eventsProvider: { getBy: function(id) { expect(id).toBe(1); return event; } }
    });
  }));

  it('should attach an event to the scope', function () {
    expect(scope.event).toBe(event);
  });
});