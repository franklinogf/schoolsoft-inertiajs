<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\SchoolResource\Pages;
use App\Models\Enviroment;
use App\Models\Feature;
use App\Models\School;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Support\Colors\Color;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Livewire\Component as Livewire;
use Override;

final class SchoolResource extends Resource
{
    protected static ?string $model = School::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    #[Override]
    public static function form(Form $form): Form
    {
        $featuresToggles = Feature::all()
            ->map(fn (Feature $feature): Toggle => Toggle::make(name: $feature->name)->default(false))->toArray();
        $enviroments = Enviroment::all()->map(
            fn (Enviroment $enviroment): Fieldset => Fieldset::make($enviroment->name)
                ->statePath($enviroment->name)
                ->columnSpanFull()
                ->schema([TextInput::make('value'), TextInput::make('other')])
        )->toArray();

        return $form
            ->schema([
                Tabs::make('Tabs')->tabs([

                    Tab::make('Main')->schema([
                        Group::make([
                            TextInput::make('id')->label('School ID')->unique(ignoreRecord: true)
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(function ($state, Set $set, string $operation): void {
                                    if ($operation === 'edit') {
                                        return;
                                    }
                                    $newState = mb_strtolower($state);
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
                                    ->dehydrateStateUsing(fn (string $state): string => env('TENANT_DB_PREFIX').mb_strtolower($state))
                                    ->required(),
                                TextInput::make('tenancy_db_username')
                                    ->label('Database user (auto filled)')
                                    ->prefix(env('TENANT_DB_PREFIX'))
                                    ->formatStateUsing(fn (?string $state): string => str_replace(env('TENANT_DB_PREFIX'), '', env('TENANT_DB_PREFIX').$state))
                                    ->dehydrateStateUsing(fn (string $state): string => env('TENANT_DB_PREFIX').mb_strtolower($state))
                                    ->required(),
                                TextInput::make('tenancy_db_password')->label('Database password (auto filled)')->default(env('TENANT_DB_PASSWORD'))->required(),

                            ])->columns(3),
                    ])->icon('heroicon-o-building-library'),

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
                        )->visible(fn ($state): bool => $state['default_mailer'] === 'smtp'),

                        Section::make('Resend')->schema(
                            [
                                TextInput::make('resend_key')->label('Key')->required(),
                            ]
                        )->visible(fn ($state): bool => $state['default_mailer'] === 'resend'),
                    ]),
                    Tab::make('Theme')
                        ->statePath('theme')
                        ->icon('heroicon-o-swatch')
                        ->schema([
                            Radio::make('current')
                                ->label('Current theme')
                                ->options([
                                    'light' => 'Light',
                                    'dark' => 'Dark',
                                ])
                                ->inline()
                                ->inlineLabel(false)
                                ->columns(2)
                                ->default('light')
                                ->required(),
                            Section::make('You can customize the theme colors here.')
                                ->description('You can use HSL for colors. Example: hsl(0 0% 100%)')
                                ->statePath('themes')
                                ->compact()
                                ->columns([
                                    'default' => 1,
                                    'sm' => 2,
                                ])
                                ->headerActions([
                                    self::importAction(),
                                ])
                                ->schema(function () {
                                    $theme = collect(config('theme.themes'));

                                    return $theme->map(function ($items, $mode) use ($theme): Fieldset {
                                        $colorItems = collect($items)
                                            ->filter(fn ($_, $key): bool => $key !== 'radius');

                                        return Fieldset::make(ucfirst($mode))
                                            ->columns(2)
                                            ->columnSpan(1)
                                            ->statePath($mode)
                                            ->schema(
                                                [
                                                    ...$colorItems->map(fn ($color, $key): ColorPicker => static::colorPicker($key, ucfirst($key), $color))->toArray(),
                                                    TextInput::make('radius')
                                                        ->label('Radius')
                                                        ->required()
                                                        ->hint('Example: 0.5rem, 10px')
                                                        ->endsWith(['rem', 'px'])
                                                        ->afterStateHydrated(function (TextInput $component, $state) use ($theme, $mode): void {
                                                            if ($state === null) {
                                                                $component->state($theme->get($mode)['radius']);
                                                            }
                                                        }),
                                                ]
                                            );
                                    })->toArray();
                                }),
                        ])->columns(2),
                ])
                    ->persistTabInQueryString()
                    ->id('tab')
                    ->columnSpanFull(),

            ]);

    }

    #[Override]
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
                    ->url(fn (School $record): string => route('home.index', ['school' => $record->id]))
                    ->openUrlInNewTab(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
            ]);
    }

    #[Override]
    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    #[Override]
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSchools::route('/'),
            'create' => Pages\CreateSchool::route('/create'),
            'edit' => Pages\EditSchool::route('/{record}/edit'),
        ];
    }

    private static function formatThemeKeyToCSS(string $key): string
    {
        return '--'.Str::slug(Str::headline($key));
    }

    private static function formatThemeKey(string $key): string
    {
        return Str::camel($key);
    }

    private static function formatThemeValueToCSS(string $value): string
    {
        return Str::replace(['hsl', '(', ')', ','], '', $value);
    }

    private static function formatThemeValue(string $value): string
    {
        $isHsl = preg_match('/(\d+(\.\d+)?)\s+(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)%/', $value);

        if ($isHsl) {
            $value = self::formatThemeValueToCSS($value);

            return 'hsl('.str_replace(' ', ', ', $value).')';
        }

        return $value;
    }

    private static function importAction(): Action
    {

        return Action::make('importTheme')
            ->slideOver()
            ->fillForm(function (School $record): array {
                $themes = '';
                collect(json_decode(json_encode($record->theme['themes'])))
                    ->each(function ($items, string $mode) use (&$themes): void {
                        $head = $mode === 'light' ? ':root' : ".{$mode}";
                        $themes .= "{$head} { \r\n";
                        collect($items)
                            ->each(function ($color, string $key) use (&$themes): void {
                                $formattedKey = static::formatThemeKeyToCSS($key);
                                $themes .= "\t {$formattedKey}: ".static::formatThemeValueToCSS($color)."; \r\n";
                            });
                        $themes .= "} \r\n";
                    });

                return [
                    'theme' => $themes,
                ];
            })
            ->form([
                Textarea::make('theme')
                    ->label('Theme')
                    ->live(onBlur: true)
                    ->required()
                    ->autosize(),
            ])
            ->modalSubmitActionLabel('Import Theme')
            ->action(function (array $data, School $record, Livewire $livewire): void {

                $theme = $data['theme'];
                $json = [];

                collect(config('theme.themes'))->keys()->each(function ($mode) use ($theme, &$json): void {

                    $replaceHead = $mode === 'light' ? ':root' : ".{$mode}";

                    $cssVariables = Str::betweenFirst($theme, $replaceHead, '}');
                    $cssVariables = Str::betweenFirst($cssVariables, '{', '}');
                    $cssVariables = Str::replaceMatches('/\t/', '', $cssVariables);
                    $cssVariables = mb_trim(Str::replaceMatches('/\r\n/', '', $cssVariables));
                    $eachCssVariable = explode(';', $cssVariables);
                    $css = [];

                    foreach ($eachCssVariable as $value) {
                        if ($value === '') {
                            continue;
                        }
                        $exploded = explode(':', mb_trim($value));

                        $css[static::formatThemeKey(mb_trim($exploded[0]))] = static::formatThemeValue(mb_trim($exploded[1]));
                    }

                    $json[$mode] = $css;

                });
                $record->update([
                    'theme->themes' => $json,
                ]);
                $livewire->refreshFormData(['theme']);

            });
    }

    private static function colorPicker(string $path, string $label, ?string $default = null): ColorPicker
    {
        $default = str_replace(' ', ', ', $default);

        return ColorPicker::make($path)
            ->live(onBlur: true)
            ->label(Str::ucfirst(Str::lower(Str::headline($label))))
            ->hsl()
            ->afterStateHydrated(function (ColorPicker $component, $state) use ($default): void {
                if ($state === null) {
                    $component->state($default);
                }
            })
            ->placeholder($default)
            ->hintAction(
                Action::make('pasteColor')
                    ->label('')
                    ->icon('heroicon-o-clipboard')
                    ->tooltip('Paste default color')
                    ->action(function (ColorPicker $component) use ($default): void {
                        $component->state($default);
                    }))

            ->regex('/hsl\(\s*(?:\d{1,3}(?:\.\d+)?)\s*,\s*(?:\d{1,2}(?:\.\d+)?|100(?:\.0+)?)%\s*,\s*(?:\d{1,2}(?:\.\d+)?|100(?:\.0+)?)%\s*\)/')
            ->required();
    }
}
