'use strict';

describe('Controller: EventsCtrl', function () {

  // load the controller's module
  beforeEach(module('storiaApp'));

  var EventsCtrl, scope;
  var event = '1';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventsCtrl = $controller('EventsCtrl', {
      $scope: scope,
      $routeParams: { id: event },
      eventsProvider: { getBy: function() {return {$bindTo: function(){}};} }
    });
  }));

  it('should attach an event to the scope', function () {
//    expect(scope.id).toBe(event);
  });
});
