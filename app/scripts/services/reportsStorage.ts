'use strict';
module StoriaApp
{
    export class ReportsStorage
    {
        public static $inject = ['ProfileProvider', 'Commander'];

        constructor(private profileProvider: StoriaApp.ProfileProvider, private commander: StoriaApp.Commander) {}

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

            var voterId = this.profileProvider.currentProfile().id;
            Assert.defined(voterId);

            var command = {
                "reportId": reportId,
                "voterId": voterId
            };

            return this
                .commander
                .command('upvote', command, 'voter')
                .then(() => {});
        }
    }
}
