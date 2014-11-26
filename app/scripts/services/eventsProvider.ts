/// <reference path="../utils/Assert.ts" />

'use strict';

angular
    .module('stServices')
    .service('eventsProvider', ['FBURL', 'fbutils', function (FBURL, fbutils) {
        var ref = new Firebase(FBURL);
        var eventsPerFetch = 4;
        var currentLimit = eventsPerFetch;

        this.getHomeEventsPromise = function () {
            return fbutils
                .viewPromise({
                    _listRef: ref.child('events').orderByChild('addedOn').limitToLast(currentLimit),
                    id: getId,
                    title: true,
                    addedOn: true,
                    reportsCount: getReportsCount,
                    preview: {
                        _key: 'previewId',
                        _ref: ref.child('reports'),
                        id: getId,
                        content: true,
                        author: authorSpec(),
                        votes: getVotes
                    }
                })
                .then(function (events) {
                    return ObjectEx.values(events).sortBy('addedOn', true);
                })
                .then(function (events) {
                    currentLimit = events.length + eventsPerFetch;

                    return events;
                });
        };

        this.getEventPromise = function (id) {
            Assert.defined(id);

            return fbutils
                .cached('event/' + id)
                .viewPromise(
                {
                    _ref: ref.child('events'),
                    id: getId,
                    title: true,
                    reportsCount: getReportsCount,
                    reports: {
                        _listRef: ref.child('reports'),
                        id: getId,
                        content: true,
                        author: authorSpec(),
                        votes: getVotes
                    }
                }, id);
        };

        function authorSpec() {
            return {
                _key: 'authorId',
                _ref: ref.child('profiles'),
                id: getId,
                image: true,
                name: true,
                publisherName: true,
                addedOn: true
            };
        }

        function getVotes(report) {
            return ObjectEx.count(report.upvotedBy);
        }

        function getReportsCount(event) {
            return ObjectEx.count(event.reports);
        }

        function getId(obj, key) {
            return key;
        }
    }]);

