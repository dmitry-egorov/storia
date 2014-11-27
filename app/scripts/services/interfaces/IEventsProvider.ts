module StoriaApp
{
    export interface IEventsProvider
    {
        getEventPromise(id: string): ng.IPromise<any>;
    }
}
