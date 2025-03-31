<?php

declare(strict_types=1);
use App\Http\Middleware\SetDefaultTenant;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;

return [
    /*
    |--------------------------------------------------------------------------
    | Enabled
    |--------------------------------------------------------------------------
    |
    | This option allows you to enable or disable mailbook.
     */
    'enabled' => env('APP_ENV') === 'local',

    /*
    |--------------------------------------------------------------------------
    | Database rollback
    |--------------------------------------------------------------------------
    |
    | This option allows you to enable or disable database rollback.
    | When enabled any changes to the database during the rendering
    | of a mail will be rolled back.
     */
    'database_rollback' => true,

    /*
    |--------------------------------------------------------------------------
    | Display preview
    |--------------------------------------------------------------------------
    |
    | This option allows you to enable or disable the screen size preview button.
     */
    'display_preview' => true,

    /*
    |--------------------------------------------------------------------------
    | Locales
    |--------------------------------------------------------------------------
    |
    | This option allows you to define which languages you want
    | to preview in mailbook.
     */
    'locales' => [
        'en' => 'English',
        'es' => 'Spanish',
    ],

    /*
    |--------------------------------------------------------------------------
    | Send
    |--------------------------------------------------------------------------
    |
    | This option allows you to enable the send mail button.
     */
    'send' => true,

    /*
    |--------------------------------------------------------------------------
    | Send to
    |--------------------------------------------------------------------------
    |
    | This option allows you to specify where the send mail button should be
    | sending to.
     */
    'send_to' => 'franklinomarflores@gmail.com',

    /*
    |--------------------------------------------------------------------------
    | Route prefix
    |--------------------------------------------------------------------------
    |
    | This option allows you to define the route prefix that will be used on
    | every route defined by mailbook.
     */
    'route_prefix' => '{school}/mailbook',

    /*
    |--------------------------------------------------------------------------
    | Middlewares
    |--------------------------------------------------------------------------
    |
    | This option allows you to define which middlewares will be used on
    | every route defined by mailbook.
     */
    'middlewares' => [
        Xammie\Mailbook\Http\Middlewares\RollbackDatabase::class,
        InitializeTenancyByPath::class,
        SetDefaultTenant::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Show credits
    |--------------------------------------------------------------------------
    |
    | This option allows you to disable the text "Created with mailbook"
     */
    'show_credits' => false,
];
