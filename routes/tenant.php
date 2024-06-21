<?php

declare(strict_types=1);

use App\Http\Controllers\Home\SchoolDocumentController;
use App\Http\Controllers\Home\SchoolHomeController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Resolvers\PathTenantResolver;



/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/
// 
Route::middleware(['tenant'])->prefix("{" . PathTenantResolver::$tenantParameterName . "}")->group(function () {
    Route::name('home.')->group(function () {
        Route::get('/', SchoolHomeController::class)->name('index');
        Route::get('/documents', [SchoolDocumentController::class, 'index'])->name('documents');
        Route::get('/documents/download/{id}', [SchoolDocumentController::class, 'download'])->name('documents.download');
    });
});

require __DIR__ . '/auth.php';