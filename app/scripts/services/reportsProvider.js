'use strict';

angular
.module ('stServices')
.service('reportsProvider', ['FBURL', 'helper', 'profileProvider', function (FBURL, helper, profileProvider)
{
    var ref = new Firebase(FBURL);

    this.votesObservable = function(reportId)
    {
        helper.assertDefined(reportId);

        return Rx.Observable.create(function (observer)
        {
            var votedByRef =
            ref
            .child('reports')
            .child(reportId)
            .child('upvotedBy');

            votedByRef
            .on('value', function(snap)
            {
                var upvotedBy = snap.val();

                observer.onNext(helper.count(upvotedBy));
            });

            return function()
            {
                votedByRef.off();
            };
        });
    };

    this.upvotedObservable = function(reportId)
    {
        helper.assertDefined(reportId);

        return Rx.Observable.create(function (observer)
        {
            var upvotedRef;

            var currentSubs =
            profileProvider
            .currentObservable()
            .subscribe(function(profile)
            {
                if(upvotedRef)
                {
                    upvotedRef.off();
                }

                if(!profile)
                {
                    observer.onNext(false);
                    return;
                }

                upvotedRef =
                ref
                .child('reports')
                .child(reportId)
                .child('upvotedBy')
                .child(profile.id);

                upvotedRef
                .on('value', function(snap)
                {
                    observer.onNext(!!snap.val());
                });
            });

            return function()
            {
                currentSubs.dispose();
                if(upvotedRef)
                {
                    upvotedRef.off();
                }
            };
        });
    };
}]);

