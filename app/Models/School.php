<?php

namespace App\Models;

use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Models\Tenant;

class School extends Tenant implements TenantWithDatabase
{
    use HasDatabase;
    protected $table = 'schools';
    protected static function booted(): void
    {
        static::creating(function (School $school) {
            $school->tenancy_db_username = config('tenancy.database.prefix') . $school->id;
            $school->tenancy_db_password = env('TENANT_DB_PASSWORD', '');
        });
    }
}
