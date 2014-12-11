'use strict';
module StoriaApp
{
    export class ReportsStorage
    {
        public static $inject = ['fbref', '$q', 'ProfileProvider'];

        constructor(private fb: Firebase, private $q: ng.IQService, private profilePrvider: StoriaApp.ProfileProvider) {}

        publish(eventId: string, content: string): ng.IPromise<void>
        {
            Assert.defined(eventId);
            Assert.defined(content);

            var authorId = this.profilePrvider.currentProfile().id;
            Assert.defined(authorId);

            return this.getReportIdOf(eventId, authorId).then(reportId =>
            {
                if (reportId)
                {
                    return this.editReport(reportId, content);
                }

                return this.addReport(eventId, authorId, content);
            });
        }

        upvote(reportId: string)
        {
            Assert.defined(reportId);

            var authorId = this.profilePrvider.currentProfile().id;
            Assert.defined(authorId);

            var upvotedRef = this.fb.child('reports').child(reportId).child('upvotedBy').child(authorId);

            upvotedRef.once('value', (snap) =>
            {
                if (snap.val())
                {
                    upvotedRef.remove();
                }
                else
                {
                    upvotedRef.set(true);
                }
            });
        }

        private addReport(eventId: string, authorId: string, content: string): ng.IPromise<void>
        {
            var deferred = this.$q.defer<void>();

            var eventRef = this.fb
                .child('events')
                .child(eventId);

            var key = this.fb
                .child('reports')
                .push(
                {
                    authorId: authorId,
                    eventId: eventId,
                    content: content,
                    addedOn: Firebase.ServerValue.TIMESTAMP
                }, () =>
                {
                    eventRef.child('reports').child(key).set(true, () =>
                    {
                        eventRef.child('previewId').set(key, () =>
                        {
                            this.fb.child('profileReports').child(authorId).child(eventId).set(key, () =>
                            {
                                this.fb.child('commands').child('report').child('queue').push(
                                    {
                                        content: content,
                                        eventId: eventId,
                                        authorId: authorId
                                    }, () =>
                                    {
                                        deferred.resolve();
                                    });
                            });
                        });
                    });
                })
                .key();

            return deferred.promise;
        }

        private editReport(reportId, content): ng.IPromise<void>
        {
            var deferred = this.$q.defer<void>();

            var reportRef = this.fb.child('reports').child(reportId);

            var contentRef = reportRef.child('content');

            contentRef.once('value', snap =>
            {
                reportRef.child('history').push(snap.val());

                contentRef.set(content, () =>
                {
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }

        private getReportIdOf(eventId: string, authorId: string): ng.IPromise<string>
        {
            var deferred = this.$q.defer();
            this.fb.child('profileReports').child(authorId).child(eventId).once('value', snap =>
            {
                deferred.resolve(snap.val());
            });

            return deferred.promise;
        }
    }
}
