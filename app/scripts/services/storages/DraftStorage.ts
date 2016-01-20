module StoriaApp
{
    export class DraftStorage
    {
        public static $inject = ['fbref', 'ProfileProvider'];

        constructor(private fb: Firebase, private profileProvider: StoriaApp.ProfileProvider) {}

        updateDraft(eventId: string, text: string): void
        {
            var author = this.profileProvider.getCurrentProfile();
            Assert.defined(author);

            var authorId = author.id;
            var draftRef = this.fb.child('drafts').child(authorId).child(eventId);

            if (!text || text === '')
            {
                draftRef.remove();
            }
            else
            {
                draftRef.set(
                    {
                        content: text,
                        savedOn: Firebase.ServerValue.TIMESTAMP
                    });
            }
        }
    }
}
