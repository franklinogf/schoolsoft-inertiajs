<?php

declare(strict_types=1);

use App\Http\Controllers\PDF\AttendanceReportPDFController;
use App\Http\Controllers\Regiweb\Notes\AttendanceController;
use App\Http\Controllers\Regiweb\Notes\RegiwebNotesController;
use Illuminate\Support\Facades\Route;

Route::name('notes.')->prefix('notes')->group(function () {
    Route::controller(RegiwebNotesController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::prefix('enter-grades')->group(function () {
            Route::get('/', 'show')->name('show');
            Route::post('/default', 'saveDefault')->name('default.save');
            Route::post('/attendance', 'saveAttendance')->name('attendance.save');
            Route::post('/exam', 'saveExam')->name('exam.save');
            Route::put('/values/{id}', 'saveValues')->name('values.save');
        });
    });
    Route::name('attendance.')->prefix('attendance')->group(function () {
        Route::controller(AttendanceController::class)->group(function () {
            Route::get('/', 'entry')->name('entry');
            Route::put('/update', 'update')->name('entry.update');
        });
        Route::controller(AttendanceReportPDFController::class)->group(function () {
            // Route::post('/report', 'report')->name('report');
            Route::get('/report', 'report')->name('report');
            // Route::post('/report/daily', 'dailyReport')->name('dailyReport');
            Route::get('/report/daily', 'dailyReport')->name('dailyReport');
        });

    });
});
