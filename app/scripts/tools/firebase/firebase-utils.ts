'use strict';

module FirebaseUtils
{
    export function getId(obj: Object, key: string): string
    {
        return key;
    }

    export class ViewGenerator
    {
        private cache: Object;

        public static $inject = ['$q'];

        constructor(private $q)
        {
            this.cache = {};
        }

        public cached(key: string)
        {
            return {
                viewPromise: (spec, id) => //TODO: get key from spec + id
                {
                    var cached = this.cache[key];
                    if (cached)
                    {
                        return cached;
                    }

                    var viewPromise = this.viewPromise(spec, id);

                    this.cache[key] = viewPromise;

                    return viewPromise;
                }
            };
        }

        public viewPromise(spec: Object, id)
        {
            var resultDeferred = this.$q.defer();

            if (spec['_listRef'] && id)
            {
                var result = [];
                var promises = [];
                var idsListRef = spec['_listRef'];

                Object.keys(id).forEach((key) =>
                {
                    var promise = this.loadRef(key, idsListRef, spec).then((obj) =>
                    {
                        result.push(obj);
                    });

                    promises.push(promise);
                });

                this.$q.all(promises).then(() =>
                {
                    resultDeferred.resolve(result);
                });
            }
            else if (spec['_listRef'])
            {
                var listRef: Firebase = spec['_listRef'];

                listRef.once('value', (snap) =>
                {
                    var result = [];
                    var promises = [];
                    var snapVal = snap.val();

                    Object.keys(snapVal).forEach((key) =>
                    {
                        var promise = this.loadObject(snapVal[key], spec, key).then((res) =>
                        {
                            result.push(res);
                        });

                        promises.push(promise);
                    });

                    this.$q.all(promises).then(() =>
                    {
                        resultDeferred.resolve(result);
                    });
                });
            }
            else if (spec['_ref'])
            {
                var ref = spec['_ref'];

                return this.loadRef(id, ref, spec);
            }

            return resultDeferred.promise;
        }

        private loadRef(id, ref, spec)
        {
            var resultDeferred = this.$q.defer();

            if (id)
            {
                ref = ref.child(id);
            }

            ref.once('value', (snap) =>
            {
                var snapVal = snap.val();

                this.loadObject(snapVal, spec, id).then((result) =>
                {
                    resultDeferred.resolve(result);
                });
            });

            return resultDeferred.promise;
        }


        private loadObject(obj, spec, key)
        {
            var result = {};

            var promises = [];

            Object.keys(spec).forEach((prop) =>
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

                    var promise = this.viewPromise(specVal, id).then((res) =>
                    {
                        result[prop] = res;
                    });

                    promises.push(promise);
                }
            });

            return this.$q.all(promises).then(() =>
            {
                return result;
            });
        }
    }
}
