'use strict';

module Assert
{
    export function notEmpty(val: string)
    {
        if (!val || val === '')
        {
            throw 'String must not be empty';
        }
    }

    export function defined(val: any)
    {
        if (val === undefined || val === null)
        {
            throw 'Value must be defined';
        }
    }
}
