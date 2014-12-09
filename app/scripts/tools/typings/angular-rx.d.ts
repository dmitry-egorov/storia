declare module ng
{
    export interface ObserveOnScope
    {
        ($scope: ng.IScope, expression: string): Rx.Observable<any>
    }
}
