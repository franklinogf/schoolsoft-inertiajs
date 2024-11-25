<?php

namespace App;

use Carbon\Carbon;

class Utils
{
    public static function getMonthName(int $monthNumber): string
    {
        $month = Carbon::create()->month($monthNumber)->translatedFormat('F');

        return strtolower($month);
    }
}
