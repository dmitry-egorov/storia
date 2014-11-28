'use strict';
interface Array<T>
{
    sortBy(key: string, desc: boolean): Array<T>;
    last():T;
    contains(item: T);
    any(func: (item: any) => boolean): boolean;
}

Array.prototype.sortBy = function (key: string, desc: boolean)
{
    function keysrt()
    {
        return function (a, b)
        {
            var less = desc ? (a[key] < b[key]) : (a[key] > b[key]);
            return less ? 1 : -1;
        };
    }

    return this.sort(keysrt());
};

Array.prototype.last = function ()
{
    return this[this.length - 1];
};

Array.prototype.contains = function (item)
{
    return this.indexOf(item) != -1;
};

Array.prototype.any = function (func: (item: any) => boolean): boolean
{
    for (var i = 0; i < this.length; i++)
    {
        var item = this[i];

        if (func(item))
        {
            return true;
        }
    }

    return false;
};


