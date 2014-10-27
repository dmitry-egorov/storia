'use strict';

angular
.module ('stServices')
.service('userStorage', ['FBURL', 'encoder', function(FBURL, encoder)
{
    this.tryCreateUser = function(uid, provider, providerData, displayName)
    {
        var ref = new Firebase(FBURL);

        var accountRef =
        ref
        .child('accounts')
        .child(uid);

        accountRef.once('value', function (snapshot)
        {
            if (snapshot.val() !== null)
            {
                return;
            }

            var profileId = encoder.encodeId(displayName);

            var profileData =
            {
                name: displayName,
                image: 'http://graph.facebook.com/' + providerData.id + '/picture?type=square',
                publicherName: ''
            };

            ref
            .child('profiles')
            .child(profileId)
            .set(profileData);

            var accountData =
            {
                provider: provider,
                profileId: profileId
            };

            accountData[provider] = providerData;

            accountRef.set(accountData);
        });
    };
}]);

