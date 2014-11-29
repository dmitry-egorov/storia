'use strict';

module StoriaApp
{
    export class ReportsProvider
    {
        public static $inject = ['fbref', 'ProfileProvider'];

        constructor(private fb: Firebase, private profileProvider: StoriaApp.ProfileProvider)
        {
        }

        watchVotesCount(reportId: string): Rx.Observable<number>
        {
            Assert.defined(reportId);

            return Rx.Observable.create<number>((observer) =>
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

        watchUpvote(reportId): Rx.Observable<UpvoteStatus>
        {
            Assert.defined(reportId);

            return Rx.Observable.create<UpvoteStatus>((observer) =>
            {
                var upvotedRef: Firebase;

                var currentSubs = this.profileProvider.watchCurrentProfile().map(x => x ? x.id : null).subscribe(profileId =>
                {
                    if (upvotedRef)
                    {
                        upvotedRef.off();
                    }

                    if (!profileId)
                    {
                        observer.onNext(UpvoteStatus.NonUpvoted);
                        return;
                    }

                    var reportRef = this.fb
                        .child('reports')
                        .child(reportId);

                    reportRef.once('value', snap =>
                    {
                        var report = snap.val();
                        Assert.defined(report);

                        if(report.authorId === profileId)
                        {
                            observer.onNext(UpvoteStatus.Owner);
                        }
                        else
                        {
                            upvotedRef = reportRef
                                .child('upvotedBy')
                                .child(profileId);

                            upvotedRef.on('value', snap =>
                            {
                                observer.onNext((!!snap.val()) ? UpvoteStatus.Upvoted : UpvoteStatus.NonUpvoted);
                            });
                        }
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

        watchReported(eventId: string): Rx.Observable<boolean>
        {
            Assert.defined(eventId);

            return Rx.Observable.create<boolean>(observer =>
            {
                var reportRef: Firebase;

                var currentSubs = this.profileProvider.watchCurrentProfile().map(x => x ? x.id : null).subscribe(profileId =>
                {
                    if(reportRef)
                    {
                        reportRef.off();
                    }

                    if(!profileId)
                    {
                        observer.onNext(false);
                        return;
                    }

                    var reportRef = this.fb
                        .child('profileReports')
                        .child(profileId)
                        .child(eventId);

                    reportRef.on('value', snap =>
                    {
                        observer.onNext(!!snap.val());
                    });
                });

                return function ()
                {
                    currentSubs.dispose();
                    reportRef.off();
                };
            });
        }
    }

    export enum UpvoteStatus
    {
        Owner = 0,
        NonUpvoted = 1,
        Upvoted = 2
    }
}
