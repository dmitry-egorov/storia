'use strict';

module StoriaApp
{
    export class UserStorage
    {
        public static $inject = ['fbref', '$http'];

        constructor(private fb: Firebase, private $http: ng.IHttpService) {}

        tryCreateUser(uid: string, provider: string, providerData, displayName: string)
        {
            var accountRef = this.fb
                    .child('accounts')
                    .child(uid);

            accountRef.once('value', (snapshot) =>
            {
                if (snapshot.val() !== null)
                {
                    return;
                }

                var profileId = Encoder.encodeId(displayName);

                this.getProfilePicture(provider, providerData, (imageUrl) =>
                {
                    var profileData =
                    {
                        name: displayName,
                        image: imageUrl,
                        publisherName: ''
                    };

                    this.fb.child('profiles')
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

            });
        }

        private getProfilePicture(provider, providerData, callback)
        {
            if (provider === 'facebook')
            {
                callback('http://graph.facebook.com/' + providerData.id + '/picture?type=square');
            }
            else if (provider === 'google')
            {
                this.$http
                        .get('http://picasaweb.google.com/data/entry/api/user/' + providerData.id + '?alt=json')
                        .success((data) =>
                        {
                            callback(data['entry']['gphoto$thumbnail']['$t']);
                        })
                        .error(function ()
                        {
                            callback('http://qsf.is.quoracdn.net/-9dd03eeb11527463.png');
                        });
            }
            else
            {
                callback('http://qsf.is.quoracdn.net/-9dd03eeb11527463.png');
            }
        }
    }
}
