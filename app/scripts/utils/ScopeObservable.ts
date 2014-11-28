module Rx
{
    export class ScopeObservable<T> implements IObservable<T>
    {
        constructor(private $scope: ng.IScope, private observable: IObservable<T>) {}

        subscribe(observer: Observer<T>): IDisposable;
        subscribe(onNext?: (value: T) => void, onError?: (exception: any) => void, onCompleted?: () => void): IDisposable;

        subscribe(onNext?: any, onError?: (exception: any) => void, onCompleted?: () => void): IDisposable
        {
            if(typeof(onNext) !== 'function')
            {
                throw 'Not supported';
            }

            return this.observable.subscribe(
                    value => this.$scope.$evalAsync(() => onNext(value)),
                    value => this.$scope.$evalAsync(() => onError(value)),
                () => this.$scope.$evalAsync(() => onCompleted())
            );
        }
    }

    Observable.prototype.withScope = BehaviorSubject.prototype.withScope = function($scope)
    {
        return new ScopeObservable($scope, this);
    };

    export interface Observable<T>
    {
        withScope($scope);
    }

    export interface BehaviorSubject<T>
    {
        withScope($scope);
    }

    export interface ObservableStatic
    {
        prototype: any;
    }

    export interface BehaviorSubjectStatic
    {
        prototype: any;
    }
}
