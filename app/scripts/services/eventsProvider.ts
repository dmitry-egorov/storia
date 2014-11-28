/// <reference path="../utils/Assert.ts" />

'use strict';

module StoriaApp
{
    export class EventsProvider implements IHomeProvider, IEventsProvider
    {
        private eventsPerFetch = 4;
        private currentLimit: number;

        public static $inject = ['fbref', 'ViewGenerator'];

        constructor(private fb: Firebase, private fbutils: FirebaseUtils.ViewGenerator)
        {
            this.currentLimit = this.eventsPerFetch;
        }

        public getHomePromise(): ng.IPromise<any>
        {
            return this.fbutils.viewPromise(
                {
                    _listRef: this.fb.child('events').orderByChild('addedOn').limitToLast(this.currentLimit),
                    id: StoriaApp.EventsProvider.getId,
                    title: true,
                    addedOn: true,
                    reportsCount: StoriaApp.EventsProvider.getReportsCount,
                    preview: {
                        _key: 'previewId',
                        _ref: this.fb.child('reports'),
                        id: StoriaApp.EventsProvider.getId,
                        content: true,
                        author: this.authorSpec(),
                        votes: StoriaApp.EventsProvider.getVotes
                    }
                }, null)
                .then((events) => events.sortBy('addedOn', true))
                .then((events) =>
                {
                    this.currentLimit = events.length + this.eventsPerFetch;

                    return events;
                });
        }

        public getEventPromise(id: string): ng.IPromise<Event>
        {
            Assert.defined(id);

            return this.fbutils.cached('event/' + id).viewPromise(
                {
                    _ref: this.fb.child('events'),
                    id: StoriaApp.EventsProvider.getId,
                    title: true,
                    reportsCount: StoriaApp.EventsProvider.getReportsCount,
                    reports: {
                        _listRef: this.fb.child('reports'),
                        id: StoriaApp.EventsProvider.getId,
                        content: true,
                        author: this.authorSpec(),
                        votes: StoriaApp.EventsProvider.getVotes
                    }
                }, id)
                .then(data =>
                {
                    var reports = (data.reports || []).map(data =>new Report(data.id, data.content, data.author, data.votes));

                    return new Event(data.id, data.title, reports)
                });
        }

        private authorSpec()
        {
            return {
                _key: 'authorId',
                _ref: this.fb.child('profiles'),
                id: StoriaApp.EventsProvider.getId,
                image: true,
                name: true,
                publisherName: true,
                addedOn: true
            };
        }

        private static getVotes(report): number
        {
            return ObjectEx.count(report.upvotedBy);
        }

        private static getReportsCount(event): number
        {
            return ObjectEx.count(event.reports);
        }

        private static getId(obj: Object, key: string): string
        {
            return key;
        }
    }
}

