'use strict';

angular
.module ('stServices')
.service('reportsStorage', ['chance', 'FBURL', function(chance, FBURL)
{
    var ref = new Firebase(FBURL);

    this.addReport = function(eventId, authorId, content)
    {
        var key = ref.child('reports').push({authorId: authorId, eventId: eventId, content: content}).name();

        ref.child('events').child(eventId).child('reports').child(key).set(true);
    };
}]);

