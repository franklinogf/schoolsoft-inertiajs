<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $path = $request->route()->getPrefix();
        $subPath = Str::afterLast($path, '/');

        $guard = match ($subPath) {
            'admin'   => 'admin',
            'regiweb' => 'teacher',
            'teacher' => 'teacher',
            'student' => 'student',
            default   => null
        };

        return [
            ...parent::share($request),
            'csrf_token' => csrf_token(),
            'auth' => [
                'user' => $request->user($guard),
            ],
            'flash' => [
                'message' => $request->session()->get('message'),
            ],
        ];
    }
}
