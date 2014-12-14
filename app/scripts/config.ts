declare var __env;

var __env = __env || {};
__env.FBURL = __env.FBURL || location.hostname === 'localhost' ? 'https://storia-local.firebaseio.com' : 'https://storia.firebaseio.com';

angular
    .module('firebase.config', [])
    .constant('fbref', new Firebase(__env.FBURL));
