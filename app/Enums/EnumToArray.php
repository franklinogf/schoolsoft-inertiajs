<?php

namespace App\Enums;

trait EnumToArray
{
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function names(): array
    {
        return array_column(self::cases(), 'name');

    }

    public static function asArray(): array
    {
        if (self::values() === []) {
            return self::names();
        }

        if (self::names() === []) {
            return self::values();
        }

        return array_column(self::cases(), 'value', 'name');
    }
}
