'use strict';

module StoriaApp
{
    export class Authenticator
    {
        public static $inject = ['fbref', 'UserStorage'];
        constructor(private fb: Firebase, private userStorage: StoriaApp.UserStorage)
        {
            this.fb.onAuth(a => this.tryRegisterUser(a));
        }

        public authWith(provider)
        {
            this.fb.authWithOAuthPopup(provider, () => {});
        }

        public unauth()
        {
            this.fb.unauth();
        }

        private tryRegisterUser(authData)
        {
            if (!authData)
            {
                return;
            }

            var provider = authData.provider;
            var providerData = authData[provider];
            var displayName = providerData.displayName;

            this.userStorage.tryCreateUser(authData.uid, provider, providerData, displayName);
        }
    }
}
