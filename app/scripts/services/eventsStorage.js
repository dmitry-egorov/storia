'use strict';

angular
    .module('stServices')
    .service('eventsStorage', ['FBURL', 'encoder', '$q', function (FBURL, encoder, $q)
    {
        var ref = new Firebase(FBURL);

        this.addEventPromiseId = function (title)
        {
            var id = encoder.encodeId(title);

            var eventRef = ref.child('events').child(id);

            var deferred = $q.defer();

            eventRef.once('value', function (snapshot)
            {
                if (snapshot.val())
                {
                    return;
                }

                eventRef.set({
                    title  : title,
                    addedOn: Firebase.ServerValue.TIMESTAMP
                }, function ()
                {
                    deferred.resolve(id);
                });
            });

            return deferred.promise;
        };
    }]);

