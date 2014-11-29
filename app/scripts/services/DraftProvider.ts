module StoriaApp
{
    export class DraftProvider
    {
        public static $inject = ['fbref', 'ProfileProvider', '$q'];

        constructor(private fb: Firebase, private profileProvider: StoriaApp.ProfileProvider, private $q: ng.IQService) {}

        getDraftContent(eventId: string): ng.IPromise<string>
        {
            var profile = this.profileProvider.currentProfile();
            Assert.defined(profile);

            var authorId = profile.id;

            var deferred = this.$q.defer();
            this.fb.child('drafts').child(authorId).child(eventId).child('content').once('value', snap =>
            {
                deferred.resolve(snap.val() || '');
            });

            return deferred.promise;
        }
    }
}
