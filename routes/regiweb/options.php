<?php

declare(strict_types=1);

use App\Http\Controllers\Regiweb\Options\Exam\BlankLineTopicController;
use App\Http\Controllers\Regiweb\Options\Exam\ExamController;
use App\Http\Controllers\Regiweb\Options\Exam\PairTopicController;
use App\Http\Controllers\Regiweb\Options\Exam\QuestionTopicController;
use App\Http\Controllers\Regiweb\Options\Exam\SelectTopicController;
use App\Http\Controllers\Regiweb\Options\Exam\TrueFalseTopicController;
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
                    Route::get('new/{course?}', 'create')->name('create');
                    Route::post('new/{course}', 'store')->name('store');

                    Route::get('{inbox?}', 'index')->name('index');
                    Route::prefix('{inbox}')->group(function () {
                        Route::delete('delete', 'destroy')->name('destroy');
                        Route::post('restore', 'restore')->name('restore');
                        Route::post('replay', 'reply')->name('reply');
                        Route::get('media/download', 'downloadAll')->name('downloadAll');
                        Route::get('media/download/{media}', 'download')->name('download');
                    });
                });

            Route::name('email.')
                ->prefix('email')
                ->controller(MessagesEmailController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/', 'send')->name('send');
                    Route::get('form', 'form')->name('form');
                });

            Route::name('sms.')
                ->prefix('sms')
                ->controller(MessagesSmscontroller::class)
                ->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/', 'send')->name('send');
                    Route::get('form', 'form')->name('form');
                });
        });

    Route::get('/homeworks', function () {
        return inertia('Regiweb/Options/Homeworks/Index');
    })->name('homeworks.index');

    Route::resource('/exams', ExamController::class)
        ->except(['show', 'create']);
    Route::name('exams.')
        ->prefix('exams')
        ->group(function () {

            Route::post('/{exam}/toggle', [ExamController::class, 'toggle'])
                ->name('toggle');
            Route::post('/{exam}/duplicate', [ExamController::class, 'duplicate'])->name('duplicate');

            Route::controller(TrueFalseTopicController::class)
                ->prefix('truefalse')
                ->name('truefalse.')
                ->group(function () {
                    Route::post('{exam}/', 'store')->name('store');
                    Route::put('{exam}/title', 'updateTitle')->name('updateTitle');
                    Route::delete('/{question}', 'destroy')->name('destroy');
                    Route::put('/{question}', 'update')->name('update');
                });

            Route::controller(SelectTopicController::class)
                ->prefix('select')
                ->name('select.')
                ->group(function () {
                    Route::post('{exam}/', 'store')->name('store');
                    Route::put('{exam}/title', 'updateTitle')->name('updateTitle');
                    Route::delete('/{question}', 'destroy')->name('destroy');
                    Route::put('/{question}', 'update')->name('update');
                });

            Route::controller(PairTopicController::class)
                ->prefix('pair')
                ->name('pair.')
                ->group(function () {
                    Route::post('{exam}/', 'store')->name('store');
                    Route::put('{exam}/title', 'updateTitle')->name('updateTitle');
                    Route::delete('/{question}', 'destroy')->name('destroy');
                    Route::put('/{question}', 'update')->name('update');

                    Route::post('{exam}/code', 'storeCode')->name('code.store');
                    Route::delete('/code/{answer}', 'destroyCode')->name('code.destroy');
                    Route::put('/code/{answer}', 'updateCode')->name('code.update');
                });

            Route::controller(BlankLineTopicController::class)
                ->prefix('blankLine')
                ->name('blankLine.')
                ->group(function () {
                    Route::post('{exam}/', 'store')->name('store');
                    Route::put('{exam}/title', 'updateTitle')->name('updateTitle');
                    Route::delete('/{question}', 'destroy')->name('destroy');
                    Route::put('/{question}', 'update')->name('update');
                });

            Route::controller(QuestionTopicController::class)
                ->prefix('question')
                ->name('question.')
                ->group(function () {
                    Route::post('{exam}/', 'store')->name('store');
                    Route::put('{exam}/title', 'updateTitle')->name('updateTitle');
                    Route::delete('/{question}', 'destroy')->name('destroy');
                    Route::put('/{question}', 'update')->name('update');
                });

        });

});
