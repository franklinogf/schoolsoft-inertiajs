<?php

use App\Http\Controllers\Regiweb\Options\ExamGeneratorController;
use App\Http\Controllers\Regiweb\Options\ExamTopicController;
use App\Http\Controllers\Regiweb\Options\MessagesController;
use App\Http\Controllers\Regiweb\Options\MessagesEmailController;
use App\Http\Controllers\Regiweb\Options\MessagesSmscontroller;
use Illuminate\Support\Facades\Route;

Route::name('options.')->prefix('options')->group(function () {
    Route::inertia('/', 'Regiweb/Options/Index')->name('index');

    Route::name('messages.')
        ->prefix('messages')
        ->group(function () {

            Route::controller(MessagesController::class)
                ->prefix('inbox')
                ->group(function () {
                    Route::get('/new/{course?}', 'create')->name('create');
                    Route::post('/new/{course}', 'store')->name('store');
                    Route::delete('/message', 'destroy')->name('destroy');
                    Route::post('/message', 'restore')->name('restore');
                    Route::get('/{inbox?}', 'index')->name('index');
                    Route::post('/{inbox}/replay', 'reply')->name('reply');
                    Route::get('/{inbox}/media/download', 'downloadAll')->name('downloadAll');
                    Route::get('/download/{media}', 'download')->name('download');
                });

            Route::name('email.')
                ->prefix('email')
                ->controller(MessagesEmailController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/', 'send')->name('send');
                    Route::get('/form', 'form')->name('form');
                });

            Route::name('sms.')
                ->prefix('sms')
                ->controller(MessagesSmscontroller::class)
                ->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/', 'send')->name('send');
                    Route::get('/form', 'form')->name('form');
                });
        });

    Route::get('/homeworks', function () {
        return inertia('Regiweb/Options/Homeworks/Index');
    })->name('homeworks.index');

    Route::resource('/exams', ExamGeneratorController::class)
        ->except(['show', 'create'])
        ->names('exams');
    Route::match(['put', 'patch'], '/exams/{exam}/toggle', [ExamGeneratorController::class, 'toggle'])
        ->name('exams.toggle');

    Route::controller(ExamTopicController::class)
        ->name('exams.')
        ->prefix('exams/{exam}/')
        ->group(function () {

            Route::prefix('truefalse')
                ->name('truefalse.')
                ->group(function () {
                    Route::post('/', 'storeTrueFalse')->name('store');
                    Route::put('/title', 'updateTrueFalseTitle')->name('updateTitle');
                    Route::delete('/{question}', 'destroyTrueFalse')->name('destroy');
                    Route::put('/{question}', 'updateTrueFalse')->name('update');
                });

            Route::prefix('select')
                ->name('select.')
                ->group(function () {
                    Route::post('/', 'storeSelect')->name('store');
                    Route::put('/title', 'updateSelectTitle')->name('updateTitle');
                    Route::delete('/{question}', 'destroySelect')->name('destroy');
                    Route::put('/{question}', 'updateSelect')->name('update');
                });

        });

});
