<?php

declare(strict_types=1);

namespace App\Utils;

final class DateUtils
{
    /**
     * Get the month name in lowercase.
     */
    public static function getMonthName(int $monthNumber): string
    {
        $month = now()->month($monthNumber)->translatedFormat('F');

        return mb_strtolower($month);
    }
}
