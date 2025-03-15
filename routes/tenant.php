<?php

declare(strict_types=1);

use App\Http\Controllers\Home\SchoolDocumentController;
use App\Http\Controllers\Home\SchoolHomeController;
use App\Http\Middleware\SetDefaultTenant;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use Stancl\Tenancy\Resolvers\PathTenantResolver;

Route::middleware(
    [
        'web',
        InitializeTenancyByPath::class,
        SetDefaultTenant::class,
    ])
    ->prefix('{'.PathTenantResolver::$tenantParameterName.'}')
    ->group(function () {
        Route::name('home.')->group(function () {
            Route::get('/', SchoolHomeController::class)->name('index');
            Route::get('/documents', [SchoolDocumentController::class, 'index'])->name('documents');
            Route::get('/documents/download/{id}', [SchoolDocumentController::class, 'download'])->name('documents.download');
        });

        require __DIR__.'/admin.php';
        require __DIR__.'/regiweb.php';
        require __DIR__.'/parents.php';
        require __DIR__.'/foro.php';

    });
