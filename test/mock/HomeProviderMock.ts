/// <reference path="../../app/scripts/services/interfaces/IHomeProvider.ts" />
/// <reference path="PromiseMock.ts" />

class HomeProviderMock implements StoriaApp.IHomeProvider
{
    constructor(private events) {}

    getHomePromise(): ng.IPromise<any>
    {
        return <ng.IPromise<any>><any> new PromiseMock(this.events);
    }
}
