<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\AdminLoginController;
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

    Route::name('admin.')->prefix('admin')->group(function () {
        Route::get('login', [AdminLoginController::class, 'create'])->name('login.index');
        Route::post('login', [AdminLoginController::class, 'store'])->name('login');
        Route::post('logout', [AdminLoginController::class, 'destroy'])->name('logout');
    });
});

require __DIR__ . '/auth.php';