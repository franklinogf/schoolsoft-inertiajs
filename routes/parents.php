<?php

use App\Http\Controllers\Admin\AdminLoginController;
use Illuminate\Support\Facades\Route;

Route::name('parents.')->prefix('parents')->group(function () {
    Route::get('login', [AdminLoginController::class, 'create'])->name('login.index');
    Route::post('login', [AdminLoginController::class, 'store'])->name('login');
    Route::post('logout', [AdminLoginController::class, 'destroy'])->name('logout');
});
