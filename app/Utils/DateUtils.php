<?php

declare(strict_types=1);

namespace App\Utils;

use Carbon\Month;

final class DateUtils
{
    /**
     * Get the month name in lowercase.
     */
    public static function getMonthName(int $monthNumber): string
    {
        $month = Month::fromNumber($monthNumber)->locale(app()->getLocale())->translatedFormat('F');

        return mb_strtolower($month);
    }
}
