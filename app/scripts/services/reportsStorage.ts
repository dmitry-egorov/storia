'use strict';
module StoriaApp
{
    export class ReportsStorage
    {
        public static $inject = ['fbref'];

        constructor(private fb: Firebase)
        {
        }

        addReport(eventId: string, authorId: string, content: string)
        {
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
                })
                .key();

            eventRef.child('reports').child(key).set(true);

            eventRef.child('previewId').set(key);
        }

        upvote(reportId: string, userId: string)
        {
            Assert.defined(reportId);
            Assert.defined(userId);

            var upvotedRef = this.fb.child('reports').child(reportId).child('upvotedBy').child(userId);

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

        editReport(reportId: string, text: string): void
        {
            var reportRef = this.fb.child('reports').child(reportId);

            var contentRef = reportRef.child('content');

            contentRef.once('value', snap =>
            {
                reportRef.child('history').push(snap.val());

                contentRef.set(text);
            });

        }
    }
}
