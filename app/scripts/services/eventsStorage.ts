'use strict';

angular
    .module('stServices')
    .service('eventsStorage', ['FBURL', '$q', function (FBURL, $q) {
        var ref = new Firebase(FBURL);

        this.addEventPromiseId = function (title: string) {
            var id = Encoder.encodeId(title);

            var eventRef = ref.child('events').child(id);

            var deferred = $q.defer();

            eventRef.once('value', function (snapshot) {
                if (snapshot.val()) {
                    return;
                }

                eventRef.set({
                    title: title,
                    addedOn: Firebase.ServerValue.TIMESTAMP
                }, function () {
                    deferred.resolve(id);
                });
            });

            return deferred.promise;
        };
    }]);

