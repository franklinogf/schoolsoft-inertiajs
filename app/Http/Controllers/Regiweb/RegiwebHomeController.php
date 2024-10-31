<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegiwebHomeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user->ufecha = now()->format('Y-m-d');
        $user->save();

        return Inertia::render('Regiweb/Index', ['ip' => $request->ip()]);
    }

    public function home()
    {
        return Inertia::render('Regiweb/Home');
    }
}
