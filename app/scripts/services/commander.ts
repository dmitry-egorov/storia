'use strict';

module StoriaApp
{
    export class Commander
    {
        public static $inject = ['fbref', '$q'];

        constructor(private fb: Firebase, private $q: ng.IQService) {}

        public command<T>(commandName: string, command: any, minionName: string): ng.IPromise<CommandResponse<T>>
        {
            Assert.notEmpty(commandName);
            Assert.notEmpty(command);
            Assert.notEmpty(minionName);

            var commandRef = this.fb
                .child('minions')
                .child('distributor')
                .child('inbox');

            return commandRef
                .pushQ(this.$q, { name: commandName, payload: command, addedOn: Firebase.ServerValue.TIMESTAMP })
                .then(key =>
                    this.fb
                        .child('minions')
                        .child(minionName)
                        .child('results')
                        .child(key)
                        .awaitQ<any>(this.$q)
                        .then(value =>
                        {
                            if(!value.ok)
                            {
                                throw "Command failed"
                            }

                            return value.data
                        })
                        .then(data => new CommandResponse(key, data))
            );
        }
    }

    export class CommandResponse<T>
    {
        constructor(public key: string, public data: T) {}
    }
}
