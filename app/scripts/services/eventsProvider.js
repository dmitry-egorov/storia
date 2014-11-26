'use strict';

angular
    .module('stServices')
    .service('eventsProvider', ['FBURL', 'fbutils', 'helper', function (FBURL, fbutils, helper)
    {
        var ref = new Firebase(FBURL);
        var eventsPerFetch = 4;
        var currentLimit = eventsPerFetch;

        this.getHomeEventsPromise = function ()
        {
            return fbutils
                .viewPromise({
                    _listRef    : ref.child('events').orderByChild('addedOn').limitToLast(currentLimit),
                    id          : getId,
                    title       : true,
                    addedOn     : true,
                    reportsCount: getReportsCount,
                    preview     : {
                        _key   : 'previewId',
                        _ref   : ref.child('reports'),
                        id     : getId,
                        content: true,
                        author : authorSpec(),
                        votes  : getVotes
                    }
                })
                .then(function (events) {
                  return Object.values(events).sortBy('addedOn', true);
                })
                .then(function (events) {
                    currentLimit += eventsPerFetch;

                    return events;
                });
        };

        this.getEventPromise = function (id)
        {
            helper.assertDefined(id);

            return fbutils
                .cached('event/' + id)
                .viewPromise(
                {
                    _ref        : ref.child('events'),
                    id          : getId,
                    title       : true,
                    reportsCount: getReportsCount,
                    reports     : {
                        _listRef: ref.child('reports'),
                        id      : getId,
                        content : true,
                        author  : authorSpec(),
                        votes   : getVotes
                    }
                }, id);
        };

        function authorSpec()
        {
            return {
                _key         : 'authorId',
                _ref         : ref.child('profiles'),
                id           : getId,
                image        : true,
                name         : true,
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

