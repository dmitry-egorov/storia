'use strict';
module StoriaApp
{
    export class ReportsStorage
    {
        public static $inject = ['fbref', 'ProfileProvider', 'Commander'];

        constructor(private fb: Firebase, private profileProvider: StoriaApp.ProfileProvider, private commander: StoriaApp.Commander) {}

        publish(eventId: string, content: string): ng.IPromise<void>
        {
            Assert.defined(eventId);
            Assert.defined(content);

            var authorId = this.profileProvider.currentProfile().id;
            Assert.defined(authorId);

            var command = {
                "addedOn": Firebase.ServerValue.TIMESTAMP,
                "eventId": eventId,
                "authorId": authorId,
                "content": content
            };

            return this
                .commander
                .command('report', command, 'reportViewGenerator')
                .then(() => {});
        }

        upvote(reportId: string)
        {
            Assert.defined(reportId);

            var authorId = this.profileProvider.currentProfile().id;
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
    }
}
