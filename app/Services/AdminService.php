<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Admin;
use Illuminate\Support\Facades\Cache;

final class AdminService
{
    public function getYear(): string
    {

        return Cache::driver('database')->rememberForever(
            'year',
            fn () => self::getPrimaryAdmin()?->year);
    }

    public function getPrimaryAdmin(): ?Admin
    {
        return Cache::driver('database')->rememberForever(
            'primary_admin',
            fn () => Admin::getPrimaryAdmin()->first());
    }
}
