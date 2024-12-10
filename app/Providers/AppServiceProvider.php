<?php

namespace App\Providers;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Model;
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
        if (app()->environment('local')) {
            Mail::alwaysTo('franklinomarflores@gmail.com');
            Mail::alwaysFrom('onboarding@resend.dev', 'Franklin Omar Flores');
        }

        Model::unguard();

        JsonResource::withoutWrapping();

        App::singleton('year', fn () => optional(Admin::getPrimaryAdmin())->year);

        Password::defaults(function () {
            return Password::min(8)->letters()
                ->mixedCase()
                ->numbers();
        });

    }
}
