'use strict';

angular
.module ('stServices')
.service('eventsProvider', ['FBURL', 'fb', function (FBURL, fb)
{
    var ref = new Firebase(FBURL);

    this.getHomeEventsPromise = function()
    {
        return fb
        .cached('home')
        .viewPromise(
        {
            _listRef: ref.child('events'),
            title: true,
            reportsCount: getReportsCount,
            preview:
            {
                _key: 'previewId',
                _ref: ref.child('reports'),
                content: true,
                author: authorSpec()
            }
        });
    };

    this.getEventPromise = function(id)
    {
        return fb
        .cached('event/' + id)
        .viewPromise(
        {
            _ref: ref.child('events'),
            title: true,
            reportsCount: getReportsCount,
            reports:
            {
                _listRef: ref.child('reports'),
                content: true,
                author: authorSpec()
            }
        }, id);
    };

    function authorSpec()
    {
        return {
            _key: 'authorId',
            _ref: ref.child('profiles'),
            image: true,
            name: true,
            publisherName: true
        };
    }

    function getReportsCount(event)
    {
        return Object.keys(event.reports || {}).length;
    }
}]);

