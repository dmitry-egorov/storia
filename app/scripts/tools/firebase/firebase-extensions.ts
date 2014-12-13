'use strict';

Firebase.prototype.setQ = function ($q: ng.IQService, obj: any): ng.IPromise<void>
{
    var self: Firebase = this;
    var d = $q.defer<void>();

    self
        .set(obj, error =>
        {
            if (error)
            {
                d.reject(error);
            }
            else
            {
                d.resolve();
            }
        });

    return d.promise;
};

Firebase.prototype.pushQ = function ($q: ng.IQService, obj: any): ng.IPromise<string>
{
    var self: Firebase = this;
    var d = $q.defer<string>();

    var key = self
        .push(obj, error =>
        {
            if (error)
            {
                d.reject(error);
            }
            else
            {
                d.resolve(key);
            }
        })
        .key();

    return d.promise;
};

Firebase.prototype.awaitQ = function<T>($q: ng.IQService): ng.IPromise<T>
{
    var self: Firebase = this;
    var d = $q.defer<T>();

    var subs = self
        .on('value', s =>
        {
            var val = s.val();
            if (!val)
            {
                return;
            }

            d.resolve(val);

            self.off('value', subs);
        });

    return d.promise;
};

Firebase.prototype.exists = function($q: ng.IQService): ng.IPromise<boolean>
{
    var self: Firebase = this;

    var d = $q.defer<boolean>();

    self.once('value', s => d.resolve(!!s.val()));

    return d.promise;
};
