<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Storage;

if (! function_exists('tenant_file_url')) {
    /**
     * Get the URL for a file stored in the tenant's storage.
     *
     * @param  string  $path  The path to the file
     * @return string The URL to the file
     */
    function tenant_file_url(string $path): string
    {
        if (tenant() === null) {
            abort(500, 'No tenant set');
        }
        $cleanPath = mb_ltrim($path, '/');
        $tenantId = tenant('id');

        return Storage::url("$tenantId/$cleanPath");
    }

}

if (! function_exists('get_extension')) {
    /**
     * Get the file extension from a file name or path.
     *
     * @param  string  $filename  The file name or path
     * @return string The file extension
     */
    function get_extension(string $filename): string
    {
        return '.'.pathinfo($filename, PATHINFO_EXTENSION);
    }
}

if (! function_exists('tmp_path')) {

    /**
     * Get the temporary path for storing files.
     *
     * @param  string|null  $folder  The folder name
     * @param  string|null  $filename  The file name
     * @return string The temporary path
     */
    function tmp_path(?string $folder = null, ?string $filename = null): string
    {
        $path = 'tmp';

        if ($folder !== null) {
            $folder = mb_ltrim($folder, '/');
            $path .= "/{$folder}";

            if ($filename !== null) {
                $filename = mb_ltrim($filename, '/');
                $path .= "/{$filename}";
            }
        }

        return $path;
    }
}

if (! function_exists('public_tenant_path')) {
    /**
     * Get the public tenant path for a file.
     *
     * @param  string|null  $path  The path to the file
     * @return string The public tenant path
     */
    function public_tenant_path(?string $path = null): string
    {
        if (tenant() === null) {
            abort(500, 'No tenant set');
        }
        $cleanPath = mb_ltrim((string) $path, '/');

        return 'public/'.(tenant('id').'/'.$cleanPath);
    }
}
