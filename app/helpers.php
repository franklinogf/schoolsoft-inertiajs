<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

if (!function_exists('create_tenant_file_url')) {

    function create_tenant_file_url($path)
    {
        abort_if(tenant() === null, 401);

        return Storage::url(tenant('id') . '/' . $path);
    }

}
if (!function_exists('get_tenant_uploaded_file_path')) {
    function get_tenant_uploaded_file_path($path)
    {

        abort_if(tenant() === null, 401);

        return Str::after($path, tenant('id'));
    }

}
