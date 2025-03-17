<?php

use App\Http\Controllers\Regiweb\Options\MessagesEmailController;
use App\Http\Controllers\Regiweb\Options\MessagesSmscontroller;
use Illuminate\Support\Facades\Route;

Route::name('options.')->prefix('options')->group(function () {
    Route::inertia('/', 'Regiweb/Options/Index')->name('index');

    Route::name('messages.')
        ->prefix('messages')
        ->group(function () {

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
});
