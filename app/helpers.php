<?php

use App\Enums\PhoneCompanyEnum;
use Illuminate\Support\Facades\Storage;

if (! function_exists('tenant_file_url')) {
    function tenant_file_url($path)
    {
        if (tenant() === null) {
            abort(500, 'No tenant set');
        }
        $cleanPath = ltrim((string) $path, '/');

        return Storage::url(tenant('id').'/'.$cleanPath);
    }

}

if (! function_exists('get_extension')) {
    function get_extension($file)
    {
        return '.'.pathinfo((string) $file, PATHINFO_EXTENSION);
    }
}

if (! function_exists('tmp_path')) {
    function tmp_path(?string $folder = null, ?string $filename = null): string
    {
        $path = 'tmp';

        if ($folder !== null) {
            $folder = ltrim($folder, '/');
            $path .= "/{$folder}";

            if ($filename !== null) {
                $filename = ltrim($filename, '/');
                $path .= "/{$filename}";
            }
        }

        return $path;
    }
}

if (! function_exists('public_tenant_path')) {
    function public_tenant_path(?string $path = null): string
    {
        if (tenant() === null) {
            abort(500, 'No tenant set');
        }
        $cleanPath = ltrim((string) $path, '/');

        return 'public/'.(tenant('id').'/'.$cleanPath);
    }
}

if (! function_exists('create_phone_email')) {
    function create_phone_email(string $phone, $company): string
    {
        return $phone.PhoneCompanyEnum::from($company)->companyHost();
    }
}
