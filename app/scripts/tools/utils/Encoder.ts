'use strict';

module Encoder
{
    export function encodeId(displayName: string): string
    {
        return displayName
            .replace(/\s+/g, '-')
            .replace(/[^A-Za-z0-9-]/g, '')
            .toLowerCase();
    }

    export function decodeId(id: string): string
    {
        return encodeId(id).replace('-', ' ');
    }
}

