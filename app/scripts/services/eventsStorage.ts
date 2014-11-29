'use strict';

module StoriaApp
{
    export class EventsStorage
    {
        public static $inject = ['fbref', '$q'];

        constructor(private fb: Firebase, private $q: ng.IQService) {}

        public addEventPromiseId(title: string): ng.IPromise<string>
        {
            Assert.notEmpty(title);

            var id = Encoder.encodeId(title);
            var eventRef = this.fb.child('events').child(id);
            var deferred = this.$q.defer<string>();

            eventRef.once('value', function (snapshot)
            {
                if (snapshot.val())
                {
                    return;
                }

                eventRef.set(
                    {
                        title: title,
                        addedOn: Firebase.ServerValue.TIMESTAMP
                    },
                    () => deferred.resolve(id)
                );
            });

            return deferred.promise;
        }
    }
}
