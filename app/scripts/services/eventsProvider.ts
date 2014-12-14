/// <reference path="../tools/utils/Assert.ts" />

'use strict';

module StoriaApp
{
    export class EventsProvider implements StoriaApp.IEventsProvider
    {
        private eventsPerFetch = 10;
        private currentLimit: number;

        public static $inject = ['fbref', 'ViewGenerator'];

        constructor(private fb: Firebase, private fbutils: FirebaseUtils.ViewGenerator)
        {
            this.currentLimit = this.eventsPerFetch;
        }

        public getEventPromise(id: string): ng.IPromise<Event>
        {
            Assert.defined(id);

            return this.fbutils.viewPromise(
                {
                    _ref: this.fb.child('events'),
                    id: FirebaseUtils.getId,
                    title: true,
                    reportsCount: Views.getReportsCount,
                    reports: {
                        _listRef: this.fb.child('reports'),
                        id: FirebaseUtils.getId,
                        content: true,
                        author: Views.author(this.fb),
                        votes: Views.getVotes
                    }
                }, id)
                .then(data =>
                {
                    var reports = (data.reports || []).map(data => ReportFactory.create(data));

                    return new Event(data.id, data.title, reports)
                });
        }
    }
}

