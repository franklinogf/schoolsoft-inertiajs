<?php

declare(strict_types=1);

namespace App\Filament\Resources\SchoolResource\Pages;

use App\Filament\Resources\SchoolResource;
use App\Models\School;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Support\Colors\Color;
use Illuminate\Support\Facades\Artisan;

final class EditSchool extends EditRecord
{
    protected static string $resource = SchoolResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('school_website')
                ->label('Go to school')
                ->color(Color::Emerald)
                ->url(fn (School $record): string => config('app.url')."/{$record->id}")
                ->openUrlInNewTab(),
            Actions\DeleteAction::make(),
        ];
    }

    private function afterSave(): void
    {
        Artisan::call('tenants:run',
            [
                'commandname' => 'cache:clear',
                '--tenants' => [$this->record->id],
            ]);
    }
}
