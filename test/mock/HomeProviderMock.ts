/// <reference path="../../app/scripts/services/interfaces/IHomeProvider.ts" />

class HomeProviderMock implements StoriaApp.IHomeProvider
{
    constructor(private events) {}

    getHomePromise(): ng.IPromise<any>
    {
        return <ng.IPromise<any>>{then: (callback) => callback(this.events)};
    }
}
