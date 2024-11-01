<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\PasswordUpdateRequest;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegiwebLoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Regiweb/Login');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'usuario' => ['required', 'min:2'],
            'clave' => ['required', 'min:6'],
        ]);
        $user = Teacher::where('usuario', $validated['usuario'])->where('clave', $validated['clave'])->first();
        if ($user) {
            Auth::guard('teacher')->login($user);
            $request->session()->regenerate();

            return redirect()->intended(route('regiweb.index'));
        }

        return to_route('regiweb.login.index')->with('error', 'Error al intentar iniciar sesión');
    }

    public function destroy(Request $request)
    {
        Auth::guard('teacher')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return to_route('regiweb.login');
    }

    public function changePassword(PasswordUpdateRequest $request)
    {
        $request->user()->fill($request->validated());
        $request->user()->save();

        return back();

    }
}
