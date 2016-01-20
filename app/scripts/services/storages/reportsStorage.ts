'use strict';
module StoriaApp
{
    export class ReportsStorage
    {
        public static $inject = ['fbref', '$q', 'ProfileProvider', 'Commander', 'AggregatesCommander'];

        constructor(private fb: Firebase, private $q: ng.IQService, private profileProvider: StoriaApp.ProfileProvider, private commander: StoriaApp.Commander, private aggregatesCommander: StoriaApp.AggregatesCommander) {}

        publish(eventAlias: string, content: string): ng.IPromise<void>
        {
            Assert.defined(eventAlias);
            Assert.defined(content);

            var authorAlias = this.profileProvider.getCurrentProfile().id;
            Assert.defined(authorAlias);

            var command = {
                "addedOn": Firebase.ServerValue.TIMESTAMP,
                "eventId": eventAlias,
                "authorId": authorAlias,
                "content": content
            };

            return this
                .commander
                .command('report', command, 'reportViewGenerator')
                .then(() =>
                {
                    var f1 = this.getEventId(eventAlias);
                    var f2 = this.getProfileId(authorAlias);
                    return this.$q.all([f1, f2]);
                })
                .then(r =>
                {
                    var eventId = r[0];
                    var profileId = r[1];

                    var command2 = {
                        t: "Report$DoReport",
                        content: content
                    };


                    var rootId = {
                        authorId: profileId,
                        eventId: eventId
                    };

                    return this
                        .aggregatesCommander
                        .command(rootId, command2)
                })
                .then(() => {});
        }

        upvote(reportId: any, cast: boolean)
        {
            Assert.defined(reportId);

            var voterAlias = this.profileProvider.getCurrentProfile().id;
            Assert.defined(voterAlias);

            var command = {
                "reportId": reportId.own,
                "voterId": voterAlias
            };

            return this
                .commander
                .command('upvote', command, 'voter')
                .then(() =>
                {
                    var f1 = this.getProfileId(reportId.authorAlias);
                    var f2 = this.getProfileId(voterAlias);
                    var f3 = this.getEventId(reportId.eventAlias);

                    return this.$q.all([f1, f2, f3])
                })
                .then(r =>
                {
                    var authorId = r[0];
                    var voterId = r[1];
                    var eventId = r[2];

                    var command2 = cast ? {t: "Upvote$Cast$"} : {t: "Upvote$Cancel$"};

                    var rootId = {
                        voterId: voterId,
                        "reportId": {
                            authorId: authorId,
                            eventId: eventId
                        }
                    };

                    return this
                        .aggregatesCommander
                        .command(rootId, command2)
                })
                .then(() => {});
        }

        private getEventId(eventAlias)
        {
            return this
                .fb
                .child("views")
                .child("events")
                .child(eventAlias)
                .child("id")
                .awaitQ<string>(this.$q);
        }

        private getProfileId(alias)
        {
            return this
                .fb
                .child("views")
                .child("profileAliasToId")
                .child(alias)
                .awaitQ<string>(this.$q);
        }
    }
}
