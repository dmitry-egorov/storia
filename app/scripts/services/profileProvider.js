'use strict';

angular
.module ('stServices')
.service('profileProvider', ['FBURL', function (FBURL)
{
    var ref = new Firebase(FBURL);

    var currentSubject = new Rx.BehaviorSubject(null);

    (function()
    {
        var profileRef;
        var accountRef;

        ref.onAuth(function(authData)
        {
            if(profileRef)
            {
                profileRef.off();
            }

            if(accountRef)
            {
                accountRef.off();
            }

            if(!authData)
            {
                currentSubject.onNext(null);
                return;
            }

            accountRef =
            ref
            .child('accounts')
            .child(authData.uid);

            accountRef
            .on('value', function(snap)
            {
                var account = snap.val();

                if(profileRef)
                {
                    profileRef.off();
                }

                if(!account)
                {
                    currentSubject.onNext(null);
                    return;
                }

                var profileId = account.profileId;

                profileRef =
                ref
                .child('profiles')
                .child(profileId);

                profileRef
                .on('value', function(snap)
                {
                    var profile = snap.val();
                    profile.id = profileId;

                    currentSubject.onNext(profile);
                });
            });
        });
    })();

    this.currentObservable = function()
    {
        return currentSubject;
    };
}]);