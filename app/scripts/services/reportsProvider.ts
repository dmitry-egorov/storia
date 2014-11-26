'use strict';

module StoriaApp
{
    export class ReportsProvider
    {
        public static $inject = ['fbref', 'ProfileProvider'];

        constructor(private fb: Firebase, private profileProvider: StoriaApp.ProfileProvider)
        {
        }

        votesObservable(reportId: string)
        {
            Assert.defined(reportId);

            return Rx.Observable.create(function (observer)
            {
                var votedByRef = this.fb
                        .child('reports')
                        .child(reportId)
                        .child('upvotedBy');

                votedByRef.on('value', (snap) =>
                {
                    var upvotedBy = snap.val();

                    observer.onNext(ObjectEx.count(upvotedBy));
                });

                return function ()
                {
                    votedByRef.off();
                };
            });
        }

        upvotedObservable(reportId)
        {
            Assert.defined(reportId);

            return Rx.Observable.create((observer) =>
            {
                var upvotedRef;

                var currentSubs = this.profileProvider
                        .currentObservable()
                        .subscribe((profile) =>
                        {
                            if (upvotedRef)
                            {
                                upvotedRef.off();
                            }

                            if (!profile)
                            {
                                observer.onNext(false);
                                return;
                            }

                            upvotedRef = this.fb
                                    .child('reports')
                                    .child(reportId)
                                    .child('upvotedBy')
                                    .child(profile.id);

                            upvotedRef.on('value', (snap) =>
                            {
                                observer.onNext(!!snap.val());
                            });
                        });

                return () =>
                {
                    currentSubs.dispose();
                    if (upvotedRef)
                    {
                        upvotedRef.off();
                    }
                };
            });
        }
    }
}
