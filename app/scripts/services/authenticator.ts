'use strict';

module StoriaApp {
  export class Authenticator {

    private ref:Firebase;
    private userStorage;

    public static $inject = ['FBURL', 'userStorage'];

    constructor(FBURL, userStorage) {
      this.userStorage = userStorage;
      this.ref = new Firebase(FBURL);

      this.ref.onAuth(a => this.tryRegisterUser(a));
    }

    public authWith(provider) {
      this.ref.authWithOAuthPopup(provider, () => {
      });
    }

    public unauth() {
      this.ref.unauth();
    }

    private tryRegisterUser(authData) {
      if (!authData) {
        return;
      }

      var provider = authData.provider;
      var providerData = authData[provider];
      var displayName = providerData.displayName;

      this.userStorage.tryCreateUser(authData.uid, provider, providerData, displayName);
    }
  }
}
