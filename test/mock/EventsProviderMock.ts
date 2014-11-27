/// <reference path="../../app/scripts/services/interfaces/IEventsProvider.ts" />

class EventsProviderMock implements StoriaApp.IEventsProvider
{
    constructor(private event) {}

    getEventPromise(id: string): ng.IPromise<any>
    {
        return <ng.IPromise<any>>{then: (callback) => callback(this.event)};
    }
}
