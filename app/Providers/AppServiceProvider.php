<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\AdminService;
use Carbon\CarbonImmutable;
use Date;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

final class AppServiceProvider extends ServiceProvider
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
        $this->configureCommands();
        $this->configureModels();
        $this->configureDates();
        $this->configureValidations();
        $this->configureJsonResources();

        if (! app()->isProduction()) {
            Mail::alwaysTo('franklinomarflores@gmail.com');
            Mail::alwaysFrom('onboarding@resend.dev', 'Franklin Omar Flores');
        }

        App::singleton('year', fn (): string => (new AdminService)->getYear());

    }

    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(app()->isProduction());
    }

    private function configureDates(): void
    {
        Date::use(CarbonImmutable::class);
    }

    private function configureModels(): void
    {

        Model::unguard();
        Relation::enforceMorphMap([
            'teacher' => \App\Models\Teacher::class,
            'student' => \App\Models\Student::class,
            'admin' => \App\Models\Admin::class,
            'inbox' => \App\Models\Inbox::class,
        ]);
    }

    private function configureValidations(): void
    {
        Password::defaults(fn () => Password::min(8)->letters()
            ->mixedCase()
            ->numbers());

    }

    private function configureJsonResources(): void
    {
        JsonResource::withoutWrapping();
    }
}
