'use strict';

module StoriaApp
{
    export class ProfileProvider
    {
        private current;
        private currentSubject: Rx.ISubject<any>;
        private profileRef: Firebase;
        private accountRef: Firebase;

        public static $inject = ['fbref'];

        constructor(private fb: Firebase)
        {
            this.currentSubject = new Rx.BehaviorSubject(null);
            this.currentSubject.subscribe(profile =>
            {
                this.current = profile;
            });
            this.initSubject();
        }

        currentProfile()
        {
            return this.current;
        }

        watchCurrentProfile(): Rx.Observable<any>
        {
            return this.currentSubject;
        }

        private initSubject(): void
        {
            this.fb.onAuth((authData) => this.authChanged(authData));
        }

        private authChanged(authData)
        {
            if (this.profileRef)
            {
                this.profileRef.off();
            }

            if (this.accountRef)
            {
                this.accountRef.off();
            }

            if (!authData)
            {
                this.currentSubject.onNext(null);
                return;
            }

            this.accountRef = this.fb
                .child('accounts')
                .child(authData.uid);

            this.accountRef.on('value', (snap) =>
            {
                this.accountChange(snap);
            });
        }

        private accountChange(snap: IFirebaseDataSnapshot): void
        {
            var account = snap.val();

            if (this.profileRef)
            {
                this.profileRef.off();
            }

            if (!account)
            {
                this.currentSubject.onNext(null);
                return;
            }

            var profileId = account.profileId;

            this.profileRef = this.fb
                .child('profiles')
                .child(profileId);

            this.profileRef.on('value', (snap) =>
            {
                var profile = snap.val();
                profile.id = profileId;

                this.currentSubject.onNext(profile);
            });
        }
    }
}
