<?php

declare(strict_types=1);

namespace App\Http\Controllers\Parents;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

final class ParentsLoginController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Parents/Login');
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

        if (Auth::guard('parents')->attempt(['usuario' => $validated['username'], 'clave' => $validated['password']])) {
            $request->session()->regenerate();

            return redirect()->intended(route('home.index'));
        }

        return to_route('parents.login.index')->with('message', 'Error al intentar iniciar sesión');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return to_route('');
    }
}
