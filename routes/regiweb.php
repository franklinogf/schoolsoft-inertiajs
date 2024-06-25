<?php

use App\Http\Controllers\Regiweb\RegiwebHomeController;
use App\Http\Controllers\Regiweb\RegiwebLoginController;
use Illuminate\Support\Facades\Route;

Route::name('regiweb.')->prefix('regiweb')->group(function () {
    Route::middleware('guest:teacher')->group(function () {
        Route::get('login', [RegiwebLoginController::class, 'create'])->name('login.index');
        Route::post('login', [RegiwebLoginController::class, 'store'])->name('login');

    });

    Route::middleware('auth:teacher')->group(function () {
        Route::delete('logout', [RegiwebLoginController::class, 'destroy'])->name('logout');
        Route::get('/', [RegiwebHomeController::class, 'index'])->name('index');
        Route::get('/home', [RegiwebHomeController::class, 'home'])->name('home');
    });
});
