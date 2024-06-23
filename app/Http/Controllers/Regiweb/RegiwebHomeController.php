<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegiwebHomeController extends Controller
{
    public function index(Request $request)
    {
        // Auth::guard('teacher')->loginUsingId('5226');

        return Inertia::render('Regiweb/Index', ['ip' => $request->ip()]);
    }

    public function home()
    {
        return Inertia::render('Regiweb/Home');
    }
}
