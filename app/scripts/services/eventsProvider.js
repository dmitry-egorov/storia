'use strict';

angular
.module ('stServices')
.service('eventsProvider', ['FBURL', 'fb', 'helper', function (FBURL, fb, helper)
{
    var ref = new Firebase(FBURL);

    this.getHomeEventsPromise = function()
    {
        return fb
        .cached('home')
        .viewPromise(
        {
            _listRef: ref.child('events'),
            id: getId,
            title: true,
            reportsCount: getReportsCount,
            preview:
            {
                _key: 'previewId',
                _ref: ref.child('reports'),
                id: getId,
                content: true,
                author: authorSpec(),
                votes: getVotes
            }
        });
    };

    this.getEventPromise = function(id)
    {
        helper.assertDefined(id);

        return fb
        .cached('event/' + id)
        .viewPromise(
        {
            _ref: ref.child('events'),
            id: getId,
            title: true,
            reportsCount: getReportsCount,
            reports:
            {
                _listRef: ref.child('reports'),
                id: getId,
                content: true,
                author: authorSpec(),
                votes: getVotes
            }
        }, id);
    };

    function authorSpec()
    {
        return {
            _key: 'authorId',
            _ref: ref.child('profiles'),
            id: getId,
            image: true,
            name: true,
            publisherName: true
        };
    }
    function getVotes(report)
    {
        return helper.count(report.upvotedBy);
    }

    function getReportsCount(event)
    {
        return helper.count(event.reports);
    }

    function getId(obj, key)
    {
        return key;
    }
}]);

