'use strict';

module StoriaApp
{
    export class EventsStorage
    {
        public static $inject = ['Commander'];

        constructor(private commander: StoriaApp.Commander) {}

        public addEvent(title: string): ng.IPromise<string>
        {
            Assert.notEmpty(title);

            var id = Encoder.encodeId(title);

            return this
                .commander
                .command('addEvent', {title: title}, 'eventViewGenerator')
                .then(() => id);
        }
    }
}
