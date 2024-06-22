<?php

use App\Http\Controllers\Admin\AdminLoginController;
use Illuminate\Support\Facades\Route;

Route::name('foro.')->prefix('foro')->group(function () {
    Route::name('teacher.')->prefix('teacher')->group(function () {
        Route::get('login', [AdminLoginController::class, 'create'])->name('login.index');
        Route::post('login', [AdminLoginController::class, 'store'])->name('login');
        Route::post('logout', [AdminLoginController::class, 'destroy'])->name('logout');
    });
    Route::name('student.')->prefix('student')->group(function () {
        Route::get('login', [AdminLoginController::class, 'create'])->name('login.index');
        Route::post('login', [AdminLoginController::class, 'store'])->name('login');
        Route::post('logout', [AdminLoginController::class, 'destroy'])->name('logout');
    });
});
