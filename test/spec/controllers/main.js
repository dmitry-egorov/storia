'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('storiaApp'));


  var MainCtrl, scope;
//  var events = [1,2,3];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      eventsProvider:
      {
        getHome: function() {return {$bindTo: function(){}};}
      }
    });
  }));

  it('should attach a list of events to the scope', function () {
//    expect(scope.events).toBe(events);
  });
});
