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
                .name();

            eventRef
                .child('reports')
                .child(key)
                .set(true);

            eventRef
                .child('previewId')
                .set(key);
        }

        upvote(reportId: string, userId: string)
        {
            Assert.defined(reportId);
            Assert.defined(userId);

            var upvotedRef = this.fb
                .child('reports')
                .child(reportId)
                .child('upvotedBy')
                .child(userId);

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
    }
}
