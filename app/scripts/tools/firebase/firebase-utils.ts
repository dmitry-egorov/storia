'use strict';

module FirebaseUtils
{
    export function getId(obj: Object, key: string): string
    {
        return key;
    }

    export class ViewGenerator
    {

        public static $inject = ['$q'];

        constructor(private $q: ng.IQService) {}

        public viewPromise(spec: Object, id): ng.IPromise<any>
        {
            if (spec['_listRef'] && id)
            {
                var idsListRef = spec['_listRef'];

                var promises =
                    Object
                        .keys(id)
                        .map((key) => this.loadRef(key, idsListRef, spec));

                return this.$q.all(promises).then(a => a.filter(x => !!x));
            }
            else if (spec['_listRef'])
            {
                var listRef: Firebase = spec['_listRef'];

                return listRef
                    .valueQ<any>(this.$q)
                    .then(value =>
                    {
                        if (!value)
                        {
                            return this.$q.when([])
                        }

                        var promises = Object
                            .keys(value)
                            .map(key => this.loadObject(value[key], spec, key));

                        return this.$q.all(promises);
                    });
            }
            else if (spec['_ref'])
            {
                return this.loadRef(id, spec['_ref'], spec);
            }
            else
            {
                throw "Invalid spec";
            }
        }

        private loadRef(id, ref, spec): ng.IPromise<any>
        {
            if (id)
            {
                ref = ref.child(id);
            }

            return ref
                .valueQ(this.$q)
                .then(value =>
                {
                    if (!value)
                    {
                        return this.$q.when(null)
                    }

                    return this.loadObject(value, spec, id)
                });
        }


        private loadObject(obj, spec, key): ng.IPromise<any>
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
