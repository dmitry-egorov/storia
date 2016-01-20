'use strict';

module StoriaApp
{
    export class AggregatesCommander
    {
        public static $inject = ['fbref', '$q'];

        constructor(private fb: Firebase, private $q: ng.IQService) {}

        public command<T>(rootId: any, command: any): ng.IPromise<any>
        {
            Assert.notEmpty(rootId);
            Assert.notEmpty(command);

            var commandType: string = command.t;

            Assert.notEmpty(commandType);

            var aggregateName = this.decapitalise(commandType.split("$")[0]);

            var aggregateRef = this.fb
                .child('es')
                .child('commands')
                .child(aggregateName);

            var inboxRef = aggregateRef
                .child('inbox');

            return inboxRef
                .pushQ(this.$q, {id: rootId, payload: command, addedOn: Firebase.ServerValue.TIMESTAMP})
                .then(key =>
                    aggregateRef
                        .child('results')
                        .child(key)
                        .awaitQ<any>(this.$q)
            );
        }

        public decapitalise(s: string)
        {
            return s.charAt(0).toLowerCase() + s.slice(1);
        }
    }
}
