<?php

namespace App\Enums;

enum TrimesterEnum: string
{
    case FIRST_TRIMESTER = 'Trimestre-1';

    case SECOND_TRIMESTER = 'Trimestre-2';

    case THIRD_TRIMESTER = 'Trimestre-3';

    case FOURTH_TRIMESTER = 'Trimestre-4';

    case SUMMER = 'Verano';

    public function number(): int
    {
        return match ($this) {
            self::FIRST_TRIMESTER => 1,
            self::SECOND_TRIMESTER => 2,
            self::THIRD_TRIMESTER => 3,
            self::FOURTH_TRIMESTER => 4,
            self::SUMMER => 5,
        };
    }

    /**
     * Get the start and end date columns for the trimester.
     *
     * @return array{start: string, end: string}
     */
    public function datesColumns(): array
    {
        return match ($this) {
            self::FIRST_TRIMESTER => ['start' => 'ft1', 'end' => 'ft2'],
            self::SECOND_TRIMESTER => ['start' => 'ft3', 'end' => 'ft4'],
            self::THIRD_TRIMESTER => ['start' => 'ft5', 'end' => 'ft6'],
            self::FOURTH_TRIMESTER => ['start' => 'ft7', 'end' => 'ft8'],
            self::SUMMER => ['start' => 'fechav1', 'end' => 'fechav2'],
        };
    }

    public function startDateColumn(): string
    {
        return $this->datesColumns()['start'];
    }

    public function endDateColumn(): string
    {
        return $this->datesColumns()['end'];
    }

    public function endColum(): ?string
    {
        return match ($this) {
            self::FIRST_TRIMESTER => 'sie1',
            self::SECOND_TRIMESTER => 'sie2',
            self::THIRD_TRIMESTER => 'sie3',
            self::FOURTH_TRIMESTER => 'sie4',
            self::SUMMER => null,
        };
    }

    public function isSummer(): bool
    {
        return $this === self::SUMMER;
    }
}
