<?php

declare(strict_types=1);

namespace App\Enums;

enum LanguageEnum: string
{
    case ENGLISH = 'en';
    case SPANISH = 'es';

    public function label(): string
    {
        return match ($this) {
            self::ENGLISH => 'English',
            self::SPANISH => 'Spanish',
        };
    }
}
