'use strict';

angular
.module ('utils')
.service('helper', function()
{
    this.count = function(obj)
    {
        return Object.keys(obj || {}).length;
    };

    this.assertDefined = function(val)
    {
        if(val === undefined || val === null)
        {
            throw 'Value must be defined';
        }
    };
});

