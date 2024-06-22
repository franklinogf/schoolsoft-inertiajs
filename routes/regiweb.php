<?php

use App\Http\Controllers\Regiweb\RegiwebLoginController;
use Illuminate\Support\Facades\Route;

Route::name('regiweb.')->prefix('regiweb')->group(function () {
    Route::get('login', [RegiwebLoginController::class, 'create'])->name('login.index');
    Route::post('login', [RegiwebLoginController::class, 'store'])->name('login');
    Route::post('logout', [RegiwebLoginController::class, 'destroy'])->name('logout');
});
