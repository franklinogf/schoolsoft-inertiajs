<?php

declare(strict_types=1);

namespace App\Filament\Resources\FeatureResource\Pages;

use App\Filament\Resources\FeatureResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

final class ManageFeatures extends ManageRecords
{
    protected static string $resource = FeatureResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
