'use strict';

angular
.module ('stServices')
.service('profileProvider', ['FBURL', '$firebase', 'fbDebug', function(FBURL, $firebase, fbDebug)
{
    var ref = new Firebase(FBURL);
    var auth = ref.getAuth();

    this.getBy = function(profileId)
    {
        var profileRef = ref.child('profiles').child(profileId);

        fbDebug.watchValue(profileRef, 'profile');

        return $firebase(profileRef).$asObject();
    };

    this.getCurrentId = function(callback)
    {
        if(auth)
        {
            ref
            .child('accounts')
            .child(auth.uid)
            .once('value', function(snapshot)
            {
                callback(snapshot.val().profileId);
            });
        }
        else
        {
            callback(undefined);
        }
    };
}]);