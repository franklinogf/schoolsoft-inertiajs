<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegiwebLoginController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Regiweb/Login');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'min:2'],
            'password' => ['required', 'min:6'],
        ]);
        $user = Teacher::where('usuario', $validated['username'])->where('clave', $validated['password'])->first();
        if ($user) {
            Auth::guard('teacher')->login($user);
            $request->session()->regenerate();

            return redirect()->intended(route('regiweb.index'));
        }

        return to_route('regiweb.login.index')->with('message', 'Error al intentar iniciar sesión');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        Auth::guard('regiweb')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return to_route('regiweb.login.index');
    }
}
