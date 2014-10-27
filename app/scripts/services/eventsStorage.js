'use strict';

angular
.module ('stServices')
.service('eventsStorage', ['chance', 'FBURL', 'encoder', function(chance, FBURL, encoder)
{
    var ref = new Firebase(FBURL);

    this.addEvent = function(title, callback)
    {
        var id = encoder.encodeId(title);

        var eventRef = ref.child('events').child(id);

        eventRef.once('value', function(snapshot)
        {
            if (snapshot.val())
            {
                return;
            }

            eventRef.set({title: title}, function ()
            {
                if (!callback)
                {
                    return;
                }

                callback(id);
            });
        });
    };
}]);

