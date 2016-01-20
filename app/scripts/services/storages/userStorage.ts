'use strict';

module StoriaApp
{
    export class UserStorage
    {
        public static $inject = ['fbref', '$q', 'Commander', 'AggregatesCommander'];

        constructor(private fb: Firebase, private $q: ng.IQService, private commander: StoriaApp.Commander, private aggregatesCommander: StoriaApp.AggregatesCommander) {}

        public tryCreateUser(authData: any): ng.IPromise<any>
        {
            var accountId = authData.uid;
            var provider = authData.provider;
            var providerData = authData[provider];
            var displayName = providerData.displayName;

            return this
                .fb
                .child('accounts')
                .child(accountId)
                .exists(this.$q)
                .then(exists =>
                {
                    if (exists)
                    {
                        return this.$q.when({});
                    }

                    var command = {
                        accountId: accountId,
                        name: displayName,
                        provider: provider,
                        providerData: providerData
                    };


                    return this
                        .commander
                        .command('register', command, 'registrator')
                        .then(() =>
                        {
                            var command2 = {
                                t: "Profile$Create",
                                provider: provider,
                                providerData: providerData,
                                accountId: accountId
                            };

                            var rootId = this.fb.push().key();

                            return this
                                .aggregatesCommander
                                .command(rootId, command2)
                        });
                })

        }
    }
}
