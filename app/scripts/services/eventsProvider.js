'use strict';

angular
.module ('stServices')
.service('eventsProvider', ['chance', 'FBURL', '$firebase', 'fbDebug', function(chance, FBURL, $firebase, fbDebug)
{
    var ref = new Firebase(FBURL);

    this.getHome = function()
    {
        var eventsRef = ref.child('events');

        fbDebug.watchValue(eventsRef, 'events');

        return $firebase(eventsRef).$asObject();
    };

    this.getBy = function(id)
    {
        var eventRef = ref.child('events').child(id);

        fbDebug.watchValue(eventRef, 'events');

        return $firebase(eventRef).$asObject();
    };
}]);

