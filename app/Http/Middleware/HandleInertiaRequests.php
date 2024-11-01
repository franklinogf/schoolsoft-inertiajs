<?php

namespace App\Http\Middleware;

use App\Enums\FlashMessageKey;
use App\Http\Resources\Teacher\TeacherResource;
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
        $subPath = Str::before(Str::after($path, '/'), '/');

        $guard = match ($subPath) {
            'admin'   => 'admin',
            'regiweb' => 'teacher',
            'teacher' => 'teacher',
            'student' => 'student',
            default   => 'web',

        };
        return [
            ...parent::share($request),
            'csrf_token' => csrf_token(),
            'auth' => [
                'user' => $request->user($guard)
                    ? $guard === 'teacher' ? TeacherResource::make($request->user($guard)) : $request->user($guard)
                    : null,
            ],
            'flash' => [
                FlashMessageKey::SUCCESS->value => $request->session()->get(FlashMessageKey::SUCCESS->value) ?? null,
                FlashMessageKey::ERROR->value => $request->session()->get(FlashMessageKey::ERROR->value) ?? null,
                FlashMessageKey::ERROR_LIST->value => $request->session()->get(FlashMessageKey::ERROR_LIST->value) ?? null,
            ],
        ];
    }
}
