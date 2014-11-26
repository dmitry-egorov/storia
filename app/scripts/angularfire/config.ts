angular
    .module('firebase.config', [])
    .constant('FBURL', 'https://storia-dev.firebaseio.com')
    .constant('fbref', new Firebase('https://storia-dev.firebaseio.com'));
