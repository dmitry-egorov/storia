'use strict';

angular
    .module('stServices')
    .service('authenticator', ['FBURL', 'userStorage', function (FBURL, userStorage) {
        var ref = new Firebase(FBURL);

        ref.onAuth(function (authData) {
            if (!authData) {
                return;
            }

            var provider = authData.provider;
            var providerData = authData[provider];
            var displayName = providerData.displayName;

            userStorage.tryCreateUser(authData.uid, provider, providerData, displayName);
        });

        this.authWith = function (provider) {
            ref.authWithOAuthPopup(provider, function () {
            });
        };

        this.unauth = function () {
            ref.unauth();
        };

    }]);