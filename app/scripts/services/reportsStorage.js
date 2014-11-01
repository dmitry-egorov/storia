'use strict';

angular
.module ('stServices')
.service('reportsStorage', ['chance', 'FBURL', 'helper', function(chance, FBURL, helper)
{
    var ref = new Firebase(FBURL);

    this.addReport = function(eventId, authorId, content)
    {
        var key =
        ref
        .child('reports')
        .push(
        {
            authorId: authorId,
            eventId: eventId,
            content: content
        })
        .name();

        ref
        .child('events')
        .child(eventId)
        .child('reports')
        .child(key)
        .set(true);
    };

    this.upvote = function(reportId, userId)
    {
        helper.assertDefined(reportId);
        helper.assertDefined(userId);

        var upvotedRef =
        ref
        .child('reports')
        .child(reportId)
        .child('upvotedBy')
        .child(userId);

        upvotedRef.once('value', function(snap)
        {
            if(snap.val())
            {
                upvotedRef.remove();
            }
            else
            {
                upvotedRef.set(true);
            }
        });


    };
}]);

