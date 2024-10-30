<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Root/Index'))->name('home');

Route::get('/contact', fn() => Inertia::render('Root/Contact'))->name('contact');

Route::get('/modules', fn() => Inertia::render('Root/Modules'))->name('modules');

Route::get('/regiweb', fn() => Inertia::render('Root/Regiweb'))->name('regiweb');


