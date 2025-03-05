<?php

use App\Http\Controllers\PDF\AttendanceReportPDFController;
use App\Http\Controllers\Regiweb\Notes\AttendanceController;
use App\Http\Controllers\Regiweb\Notes\RegiwebNotesController;
use App\Http\Controllers\Regiweb\Options\MessagesEmailController;
use App\Http\Controllers\Regiweb\RegiwebHomeController;
use App\Http\Controllers\Regiweb\RegiwebLoginController;
use App\Http\Controllers\Regiweb\RegiwebOptionsIndexController;
use App\Http\Controllers\Regiweb\RegiwebProfileController;
use App\Http\Controllers\Regiweb\RegiwebReportsIndexController;
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

        Route::name('options.')->prefix('options')->group(function () {
            Route::get('/', RegiwebOptionsIndexController::class)->name('index');
            Route::name('messages.')->prefix('messages')->group(function () {
                Route::get('/email', [MessagesEmailController::class, 'index'])->name('email.index');
                Route::get('/email/form', [MessagesEmailController::class, 'form'])->name('email.form');
                Route::post('/email', [MessagesEmailController::class, 'send'])->name('email.send');
            });
        });

        Route::name('reports.')->prefix('reports')->group(function () {
            Route::get('/', RegiwebReportsIndexController::class)->name('index');
        });

    });
});
