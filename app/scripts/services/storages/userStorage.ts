'use strict';

module StoriaApp
{
    export class UserStorage
    {
        public static $inject = ['fbref', '$q', 'Commander'];

        constructor(private fb: Firebase, private $q: ng.IQService, private commander: StoriaApp.Commander) {}

        public tryCreateUser(accountId: string, provider: string, providerData, displayName: string): ng.IPromise<any>
        {
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
                        providerUid: providerData.id,
                        providerData: providerData
                    };

                    return this.commander.command('register', command, 'registrator');
                });
        }
    }
}
