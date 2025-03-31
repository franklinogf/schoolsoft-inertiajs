<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb;

use App\Enums\FlashMessageKey;
use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\PasswordUpdateRequest;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

final class RegiwebLoginController extends Controller
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

        return to_route('regiweb.login.index')->with(FlashMessageKey::ERROR->value, __('Credenciales inválidas'));
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

        return back()->with(FlashMessageKey::SUCCESS->value, __('Contraseña cambiada con éxito'));

    }
}
