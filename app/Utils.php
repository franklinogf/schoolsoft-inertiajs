<?php

declare(strict_types=1);

namespace App;

use Carbon\Carbon;

final class Utils
{
    public static function getMonthName(int $monthNumber): string
    {
        $month = Carbon::create()->month($monthNumber)->translatedFormat('F');

        return mb_strtolower($month);
    }
}
