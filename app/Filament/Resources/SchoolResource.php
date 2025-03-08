<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SchoolResource\Pages;
use App\Models\Enviroment;
use App\Models\Feature;
use App\Models\School;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Support\Colors\Color;
use Filament\Tables;
use Filament\Tables\Table;

class SchoolResource extends Resource
{
    protected static ?string $model = School::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    public static function form(Form $form): Form
    {
        $featuresToggles = Feature::all()
            ->map(fn (Feature $feature) => Toggle::make(name: $feature->name)->default(false))->toArray();
        $enviroments = Enviroment::all()->map(
            function (Enviroment $enviroment) {
                return FieldSet::make($enviroment->name)
                    ->statePath($enviroment->name)
                    ->columnSpanFull()
                    ->schema([TextInput::make('value'), TextInput::make('other')]);
            }
        )->toArray();

        return $form
            ->schema([
                Tabs::make('Tabs')->tabs([

                    Tab::make('Main')->schema([
                        Group::make([
                            TextInput::make('id')->label('School ID')->unique(ignoreRecord: true)
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(function ($state, Set $set, string $operation) {
                                    if ($operation === 'edit') {
                                        return;
                                    }
                                    $newState = strtolower($state);
                                    $set('tenancy_db_username', $newState);
                                    $set('tenancy_db_name', $newState);
                                    $set('id', $newState);
                                }),
                            TextInput::make('name')->label('Name')->required(),

                        ])->columns(2),
                        Grid::make(3)->schema([
                            Select::make('locale')
                                ->label('Locale')
                                ->options(fn () => collect(config('main.supported_locales'))->mapWithKeys(fn ($locale) => [$locale => $locale]))
                                ->native(false)
                                ->default('es')
                                ->selectablePlaceholder(false)
                                ->required(),

                        ]),
                        Fieldset::make('Database information')
                            ->schema([
                                TextInput::make('tenancy_db_name')
                                    ->label('Database name (auto filled)')
                                    ->prefix(env('TENANT_DB_PREFIX'))
                                    ->formatStateUsing(fn (?string $state): string => str_replace(env('TENANT_DB_PREFIX'), '', env('TENANT_DB_PREFIX').$state))
                                    ->dehydrateStateUsing(fn (string $state): string => env('TENANT_DB_PREFIX').strtolower($state))
                                    ->required(),
                                TextInput::make('tenancy_db_username')
                                    ->label('Database user (auto filled)')
                                    ->prefix(env('TENANT_DB_PREFIX'))
                                    ->formatStateUsing(fn (?string $state): string => str_replace(env('TENANT_DB_PREFIX'), '', env('TENANT_DB_PREFIX').$state))
                                    ->dehydrateStateUsing(fn (string $state): string => env('TENANT_DB_PREFIX').strtolower($state))
                                    ->required(),
                                TextInput::make('tenancy_db_password')->label('Database password (auto filled)')->default(env('TENANT_DB_PASSWORD'))->required(),

                            ])->columns(3),
                    ]),

                    Tab::make('Enviroments')->schema([
                        Group::make()->statePath('enviroments')
                            ->schema($enviroments)
                            ->columns(['sm' => 2, 'md' => 6])->grow(false),
                    ]),

                    Tab::make('Features')->schema([
                        Group::make()->statePath('features')
                            ->schema($featuresToggles)
                            ->columns(['sm' => 2, 'md' => 6])->grow(false),
                        TextInput::make('default_mail_from')->label('Default email from')->email()->required(),

                        Select::make('default_mailer')->label('Default mailer')
                            ->options([
                                'smtp' => 'SMTP',
                                'resend' => 'Resend',
                            ])
                            ->live()
                            ->native(false)
                            ->default('smtp')
                            ->selectablePlaceholder(false)
                            ->required(),

                        Section::make('SMTP')->schema(
                            [
                                TextInput::make('smtp_host')->label('Host')->required(),
                                TextInput::make('smtp_port')->label('Port')->required(),
                                TextInput::make('smtp_username')->label('Username')->required(),
                                TextInput::make('smtp_password')->label('Password')->required(),
                                TextInput::make('smtp_encryption')->label('Encryption')->required(),
                            ]
                        )->visible(fn ($state) => $state['default_mailer'] === 'smtp'),

                        Section::make('Resend')->schema(
                            [
                                TextInput::make('resend_key')->label('Key')->required(),
                            ]
                        )->visible(fn ($state) => $state['default_mailer'] === 'resend'),
                    ]),
                ])->columnSpanFull(),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\Action::make('school_website')
                    ->label('Go to school')
                    ->color(Color::Emerald)
                    ->url(fn (School $record): string => config('app.url')."/{$record->id}")
                    ->openUrlInNewTab(),
                /* ------------------------------- new website ------------------------------ */
                // Tables\Actions\Action::make('school_website')
                //     ->label('Go to school')
                //     ->url(fn(School $record): string => route('home.index', ['school' => $record->id]))
                //     ->openUrlInNewTab(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSchools::route('/'),
            'create' => Pages\CreateSchool::route('/create'),
            'edit' => Pages\EditSchool::route('/{record}/edit'),
        ];
    }
}
