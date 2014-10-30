'use strict';

angular
.module ('stServices')
.service('profileProvider', ['FBURL', function (FBURL)
{
    var ref = new Firebase(FBURL);
    var auth = ref.getAuth();

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