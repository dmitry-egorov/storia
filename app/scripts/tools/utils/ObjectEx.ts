module ObjectEx {
    export function values(obj: Object):any[] {
        var values = [];

        for (var key in obj) {
            values.push(obj[key]);
        }

        return values;
    }

    export function count(obj: Object): number {
        return Object.keys(obj || {}).length;
    }
}
