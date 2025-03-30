<?php

namespace App\Providers;

use App\Services\AdminService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->isLocal()) {
            Mail::alwaysTo('franklinomarflores@gmail.com');
            Mail::alwaysFrom('onboarding@resend.dev', 'Franklin Omar Flores');
        }

        Model::unguard();

        JsonResource::withoutWrapping();

        App::singleton('year', fn () => (new AdminService)->getYear());

        Password::defaults(function () {
            return Password::min(8)->letters()
                ->mixedCase()
                ->numbers();
        });

        Relation::enforceMorphMap([
            'teacher' => 'App\Models\Teacher',
            'student' => 'App\Models\Student',
            'admin' => 'App\Models\Admin',
            'inbox' => 'App\Models\Inbox',
        ]);

    }
}
