<?php

namespace App\Models;

use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Models\Tenant;

/**
 * @property string $id
 * @property string $name
 * @property array $enviroments
 * @property array $features
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property object $theme
 * @property string $tenancy_db_username
 * @property string $tenancy_db_password
 */
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
            'theme',
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
            'theme' => 'json',
        ];
    }
}
