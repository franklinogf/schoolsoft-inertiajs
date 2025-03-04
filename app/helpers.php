<?php

use Illuminate\Support\Facades\Storage;

if (! function_exists('tenant_file_url')) {
    function tenant_file_url($path)
    {
        if (tenant() === null) {
            abort(500, 'No tenant set');
        }
        $cleanPath = ltrim($path, '/');

        return Storage::url(tenant('id').'/'.$cleanPath);
    }

}
