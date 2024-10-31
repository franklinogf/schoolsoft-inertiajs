<?php

namespace App\Models;

use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Models\Tenant;

class School extends Tenant implements TenantWithDatabase
{
    use HasDatabase;

    protected $guarded = [];

    protected $table = 'schools';

    protected static function booted(): void
    {
        static::creating(function (School $school) {
            if (! $school->tenancy_db_username) {
                $school->tenancy_db_username = config('tenancy.database.prefix').$school->id;
            }
            $school->tenancy_db_password = env('TENANT_DB_PASSWORD', '');
        });
    }

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'enviroments',
            'features',
            'created_at',
            'updated_at',
        ];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'enviroments' => 'array',
            'features' => 'array',
        ];
    }
}
