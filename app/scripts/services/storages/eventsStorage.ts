'use strict';

module StoriaApp
{
    export class EventsStorage
    {
        public static $inject = ['fbref', 'Commander', 'AggregatesCommander'];

        constructor(private fb: Firebase, private commander: StoriaApp.Commander, private aggregatesCommander: StoriaApp.AggregatesCommander) {}

        public addEvent(title: string): ng.IPromise<string>
        {
            Assert.notEmpty(title);

            var id = Encoder.encodeId(title);

            return this
                .commander
                .command('addEvent', {title: title}, 'eventViewGenerator')
                .then(() =>
                {
                    var command2 = {
                        t: "Event$Create",
                        title: title
                    };

                    var rootId = this.fb.push().key();

                    return this
                        .aggregatesCommander
                        .command(rootId, command2)
                })
                .then(() => id);
        }
    }
}
