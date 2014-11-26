'use strict';

angular
    .module('stServices')
    .service('reportsStorage', ['FBURL', function (FBURL) {
        var ref = new Firebase(FBURL);

        this.addReport = function (eventId, authorId, content) {
            var key =
                ref
                    .child('reports')
                    .push(
                    {
                        authorId: authorId,
                        eventId: eventId,
                        content: content,
                        addedOn: Firebase.ServerValue.TIMESTAMP
                    })
                    .name();

            ref
                .child('events')
                .child(eventId)
                .child('reports')
                .child(key)
                .set(true);
        };

        this.upvote = function (reportId, userId) {
            Assert.defined(reportId);
            Assert.defined(userId);

            var upvotedRef =
                ref
                    .child('reports')
                    .child(reportId)
                    .child('upvotedBy')
                    .child(userId);

            upvotedRef.once('value', function (snap) {
                if (snap.val()) {
                    upvotedRef.remove();
                }
                else {
                    upvotedRef.set(true);
                }
            });


        };
    }]);

