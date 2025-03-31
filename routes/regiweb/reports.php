<?php

declare(strict_types=1);

use App\Http\Controllers\Regiweb\RegiwebReportsIndexController;
use Illuminate\Support\Facades\Route;

Route::name('reports.')->prefix('reports')->group(function () {
    Route::get('/', RegiwebReportsIndexController::class)->name('index');
});
