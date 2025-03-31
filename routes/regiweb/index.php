<?php

declare(strict_types=1);

use App\Http\Controllers\Regiweb\RegiwebHomeController;
use App\Http\Controllers\Regiweb\RegiwebLoginController;
use App\Http\Controllers\Regiweb\RegiwebProfileController;
use Illuminate\Support\Facades\Route;

Route::name('regiweb.')->prefix('regiweb')->group(function () {

    Route::middleware('guest:teacher')->group(function () {

        Route::get('login', [RegiwebLoginController::class, 'create'])->name('login.index');
        Route::post('login', [RegiwebLoginController::class, 'store'])->name('login');

    });

    Route::middleware('auth:teacher')->group(function () {

        Route::delete('logout', [RegiwebLoginController::class, 'destroy'])->name('logout');
        Route::patch('/password-update', [RegiwebLoginController::class, 'changePassword'])->name('password');
        Route::get('/', [RegiwebHomeController::class, 'index'])->name('index');
        Route::get('/home', [RegiwebHomeController::class, 'home'])->name('home');
        Route::get('/profile', [RegiwebProfileController::class, 'show'])->name('profile.show');
        Route::post('/profile', [RegiwebProfileController::class, 'update'])->name('profile.update');

        require __DIR__.'/notes.php';
        require __DIR__.'/options.php';
        require __DIR__.'/reports.php';

    });

});
