<?php

use App\Http\Controllers\Root\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Root/Index'))->name('home');

Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

Route::get('/modules', fn () => Inertia::render('Root/Modules'))->name('modules');

Route::get('/regiweb', fn () => Inertia::render('Root/Regiweb'))->name('regiweb');
