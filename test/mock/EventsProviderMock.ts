/// <reference path="../../app/scripts/services/interfaces/IEventsProvider.ts" />
/// <reference path="PromiseMock.ts" />

class EventsProviderMock implements StoriaApp.IEventsProvider
{
    constructor(private event) {}

    getEventPromise(id: string): ng.IPromise<any>
    {
        return <ng.IPromise<any>><any> new PromiseMock(this.event);
    }
}
