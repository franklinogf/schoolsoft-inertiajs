<?php

declare(strict_types=1);

namespace App\Filament\Resources\SchoolResource\Pages;

use App\Filament\Resources\SchoolResource;
use App\Models\School;
use Exception;
use Filament\Actions;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
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
            Actions\Action::make('run_migrations')
                ->label('Run migrations')
                ->color('warning')

                ->form([
                    Textarea::make('output')
                        ->label('Output')
                        ->rows(20)
                        ->disabled(),

                ])
                ->mountUsing(function (Form $form, School $record): void {
                    try {
                        Artisan::call('tenants:migrate',
                            [
                                '--tenants' => [$record->id],
                            ]);
                        $form->fill(['output' => Artisan::output()]);
                    } catch (Exception $e) {
                        $form->fill(['output' => $e->getMessage()]);
                    }

                })
                ->slideOver()
                ->modalSubmitAction(false),
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
