<?php

namespace App\Http\Middleware;

use App\Enums\FlashMessageKey;
use App\Http\Resources\Teacher\TeacherResource;
use Illuminate\Http\Request;
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
        $subPath = $request->segment(2);
        $guard = $this->determineGuard($subPath);
        $user = $this->getUser($request, $guard);

        return [
            ...parent::share($request),
            'locale' => app()->getLocale(),
            'csrf_token' => csrf_token(),
            'auth' => [
                'user' => $user,
            ],
            'flash' => $this->getFlashMessages($request),
        ];
    }

    private function determineGuard(?string $subPath): ?string
    {
        return match ($subPath) {
            'admin' => 'admin',
            'regiweb' => 'teacher',
            'teacher' => 'teacher',
            'student' => 'student',
            default => null,
        };
    }

    private function getUser(Request $request, ?string $guard)
    {
        if ($guard) {
            if ($guard === 'teacher' && $request->user($guard)) {
                return new TeacherResource($request->user($guard));
            }

            return $request->user($guard);
        }

        return null;
    }

    private function getFlashMessages(Request $request): array
    {
        return [
            FlashMessageKey::SUCCESS->value => $request->session()->get(FlashMessageKey::SUCCESS->value),
            FlashMessageKey::ERROR->value => $request->session()->get(FlashMessageKey::ERROR->value),
            FlashMessageKey::ERROR_LIST->value => $request->session()->get(FlashMessageKey::ERROR_LIST->value),
        ];
    }
}
