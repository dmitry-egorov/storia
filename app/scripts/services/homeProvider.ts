/// <reference path="../tools/utils/Assert.ts" />

'use strict';

module StoriaApp
{
    export class HomeProvider implements StoriaApp.IHomeProvider
    {
        private eventsPerFetch = 10;
        private currentLimit: number;
        private allEvents: Array<any>;

        public static $inject = ['fbref', 'ViewGenerator','$q'];

        constructor(private fb: Firebase, private fbutils: FirebaseUtils.ViewGenerator, private $q: ng.IQService)
        {
            this.currentLimit = this.eventsPerFetch;
        }

        public getHomePromise(): ng.IPromise<Array<any>>
        {
            if(this.allEvents)
            {
                return this.$q.when(this.allEvents);
            }

            return this.fbutils.viewPromise(
                {
                    _listRef: this.fb.child('events').orderByChild('addedOn').limitToLast(this.currentLimit),
                    id: FirebaseUtils.getId,
                    title: true,
                    addedOn: true,
                    reportsCount: Views.getReportsCount,
                    preview: {
                        _key: 'previewId',
                        _ref: this.fb.child('reports'),
                        id: FirebaseUtils.getId,
                        content: true,
                        author: Views.author(this.fb),
                        votes: Views.getVotes
                    }
                }, null)
                .then((events) => events.sortBy('addedOn', true))
                .then((events) =>
                {
                    if (this.currentLimit > events.length)
                    {
                        this.allEvents = events;
                    }
                    else
                    {
                        this.currentLimit += this.eventsPerFetch;
                    }

                    return events;
                });
        }
    }
}

