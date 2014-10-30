'use strict';

angular
.module ('stServices')
.service('profileProvider', ['FBURL', function (FBURL)
{
    var ref = new Firebase(FBURL);

    var currentProfileSubject = new Rx.BehaviorSubject({id: undefined, profile: undefined});

    (function()
    {
        var profileRef;

        ref.onAuth(function(authData)
        {
            if(profileRef)
            {
                profileRef.off();
            }

            if(!authData)
            {
                currentProfileSubject.onNext({id: undefined, profile: undefined});
                return;
            }

            ref
            .child('accounts')
            .child(authData.uid)
            .once('value', function(snap)
            {
                var account = snap.val();

                var profileId = account.profileId;

                profileRef =
                ref
                .child('profiles')
                .child(profileId);

                profileRef
                .on('value', function(snap)
                {
                    currentProfileSubject.onNext({id: profileId, profile: snap.val()});
                });
            });
        });
    })();

    this.getCurrentProfileObservable = function()
    {
        return currentProfileSubject;
    };
}]);