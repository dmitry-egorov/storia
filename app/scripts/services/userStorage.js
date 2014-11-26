'use strict';

angular
    .module('stServices')
    .service('userStorage', ['FBURL', 'encoder', '$http', function (FBURL, encoder, $http) {
        this.tryCreateUser = function (uid, provider, providerData, displayName) {
            var ref = new Firebase(FBURL);

            var accountRef =
                ref
                    .child('accounts')
                    .child(uid);

            accountRef.once('value', function (snapshot) {
                if (snapshot.val() !== null) {
                    return;
                }

                var profileId = encoder.encodeId(displayName);

                getProfilePicture(provider, providerData, function (imageUrl) {
                    var profileData =
                    {
                        name: displayName,
                        image: imageUrl,
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

            });
        };

        function getProfilePicture(provider, providerData, callback) {
            if (provider === 'facebook') {
                callback('http://graph.facebook.com/' + providerData.id + '/picture?type=square');
            }
            else if (provider === 'google') {
                $http.get('http://picasaweb.google.com/data/entry/api/user/' + providerData.id + '?alt=json')
                    .success(function (data) {
                        callback(data.entry.gphoto$thumbnail.$t);
                    })
                    .error(function () {
                        callback('http://qsf.is.quoracdn.net/-9dd03eeb11527463.png');
                    });
            }
            else {
                callback('http://qsf.is.quoracdn.net/-9dd03eeb11527463.png');
            }
        }
    }]);

