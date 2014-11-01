'use strict';

angular
.module ('firebaseUtils')
.service('fb', ['$q', function($q)
{
    var self = this;

    var cache = {};

    self.cached = function(key)
    {
        return {
            viewPromise: function(spec, id)//TODO: get key from spec + id
            {
                var cached = cache[key];
                if(cached)
                {
                   return cached;
                }

                var viewPromise = self.viewPromise(spec, id);

                cache[key] = viewPromise;

                return viewPromise;
            }
        };
    };

    self.viewPromise = function(spec, id)
    {
        var resultDeferred = $q.defer();

        if(spec._listRef && id)
        {
            var result = {};
            var promises = [];
            var idsListRef = spec._listRef;

            Object
            .keys(id)
            .forEach(function(key)
            {
                var promise =
                loadRef(key, idsListRef, spec)
                .then(function(obj)
                {
                     result[key] = obj;
                });

                promises.push(promise);
            });

            $q
            .all(promises)
            .then(function() { resultDeferred.resolve(result); });
        }
        else if(spec._listRef)
        {
            var listRef = spec._listRef;

            listRef
            .once('value', function(snap)
            {
                var promises = [];
                var result = {};
                var snapVal = snap.val();

                Object
                .keys(snap.val())
                .forEach(function(key)
                {
                    var promise =
                    loadObject(snapVal[key], spec, key)
                    .then(function (res)
                    {
                        result[key] = res;
                    });

                    promises.push(promise);
                });

                $q
                .all(promises)
                .then(function() { resultDeferred.resolve(result); });
            });
        }
        else if (spec._ref)
        {
            var ref = spec._ref;

            return loadRef(id, ref, spec);
        }

        return resultDeferred.promise;
    };

    function loadRef(id, ref, spec)
    {
        var resultDeferred = $q.defer();

        if (id)
        {
            ref = ref.child(id);
        }

        ref
        .once('value', function (snap)
        {
            var snapVal = snap.val();

            loadObject(snapVal, spec, id)
            .then(function (result)
            {
                resultDeferred.resolve(result);
            });
        });

        return resultDeferred.promise;
    }

    function loadObject(obj, spec, key)
    {
        var result = {};

        var promises = [];

        Object
        .keys(spec)
        .forEach(function (prop)
        {
            if (prop === '_ref' || prop === '_listRef' || prop === '_key')
            {
                return;
            }

            var specVal = spec[prop];
            var val = obj[prop];
            var specType = typeof(specVal);

            if (specType === 'boolean')
            {
                result[prop] = val;
            }
            else if (specType === 'function')
            {
                result[prop] = specVal(obj, key);
            }
            else if (specType === 'object')
            {
                var idProp = specVal._key || prop;
                var id = obj[idProp];

                if (!id)
                {
                    return;
                }

                var promise =
                self
                .viewPromise(specVal, id)
                .then(function (res)
                {
                    result[prop] = res;
                });

                promises.push(promise);
            }
        });

        return $q.all(promises).then(function() { return result; });
    }
}]);

