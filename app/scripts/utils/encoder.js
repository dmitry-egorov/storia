'use strict';

angular
.module ('utils')
.service('encoder', function()
{
    this.encodeId = function(displayName)
    {
        return displayName
        .replace(/\s+/g, '-')
        .replace(/[^A-Za-z0-9-]/g, '')
        .toLowerCase();
    };
});

