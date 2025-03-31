<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\School;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Override;

final class SchoolCount extends BaseWidget
{
    #[Override]
    protected function getStats(): array
    {
        $schoolCount = School::count();

        return [
            Stat::make('Amount of Schools', $schoolCount)->color('success')->chart([0, $schoolCount]),
        ];
    }
}
