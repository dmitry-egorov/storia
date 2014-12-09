/// <reference path="../tools/utils/Assert.ts" />

'use strict';

module StoriaApp
{
    export class Searcher
    {
        public static $inject = ['fbref', 'ViewGenerator', '$q'];

        constructor(private fb: Firebase, private fbutils: FirebaseUtils.ViewGenerator, private $q: ng.IQService) {}

        searchPromise(query: string): ng.IPromise<Array<string>>
        {
            var d = this.$q.defer();

            var searchRef = this.fb.child("commands").child("search");

            var key = searchRef.child("queue").push({query: query}, () =>
            {
                this.subscribeForResult(searchRef, key, d);
            }).key();

            return d.promise
        }

        private subscribeForResult(searchRef, key, d)
        {
            var resultRef = searchRef.child("results").child(key);
            var valueSubs = resultRef.on('value', snap =>
            {
                var result = snap.val();
                if (!result)
                {
                    return;
                }

                if (result.ok)
                {
                    this.getEvent(result)
                        .then(r =>
                        {
                            resultRef.off('value', valueSubs);
                            d.resolve(r)
                        });
                }
                else
                {
                    d.reject("Search failed");
                    resultRef.off('value', valueSubs);
                }
            })
        }

        private getEvent(result)
        {
            var eventIdsObject = {};
            var data = result.data;
            if(!data)
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

