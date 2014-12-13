/// <reference path="../tools/utils/Assert.ts" />

'use strict';

module StoriaApp
{
    export class Searcher
    {
        public static $inject = ['fbref', 'ViewGenerator', '$q', 'Commander'];

        constructor(private fb: Firebase, private fbutils: FirebaseUtils.ViewGenerator, private $q: ng.IQService, private commander: StoriaApp.Commander) {}

        searchPromise(query: string): ng.IPromise<Array<string>>
        {
            return this
                .commander
                .command('search', {query: query}, 'searcher')
                .then(cr => this.getEvent(cr.data));
        }

        private getEvent(data): ng.IPromise<Array<string>>
        {
            var eventIdsObject = {};
            if (!data)
            {
                return this.$q.when([]);
            }

            var eventIds = data.eventIds;
            for (var i = 0; i < eventIds.length; i++)
            {
                eventIdsObject[eventIds[i]] = true;
            }

            return this.fbutils.viewPromise(
                {
                    _listRef: this.fb.child('events'),
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
                }, eventIdsObject);
        }
    }
}

