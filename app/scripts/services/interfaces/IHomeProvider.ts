module StoriaApp
{
    export interface IHomeProvider
    {
        getHomePromise(): ng.IPromise<any>;
    }
}
