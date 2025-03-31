<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Laravel\Telescope\EntryType;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\Telescope;
use Laravel\Telescope\TelescopeApplicationServiceProvider;
use Override;

final class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
{
    /**
     * Register any application services.
     */
    #[Override]
    public function register(): void
    {
        Telescope::night();

        $this->hideSensitiveRequestDetails();

        Telescope::filter(function (IncomingEntry $entry): bool {
            if (app()->isLocal()) {
                return true;
            }
            if ($entry->isReportableException()) {
                return true;
            }
            if ($entry->isFailedRequest()) {
                return true;
            }
            if ($entry->isFailedJob()) {
                return true;
            }
            if ($entry->isScheduledTask()) {
                return true;
            }
            if ($entry->isSlowQuery()) {
                return true;
            }
            if ($entry->isEvent()) {
                return true;
            }
            if ($entry->isDump()) {
                return true;
            }
            if ($entry->isLog()) {
                return true;
            }
            if ($entry->type === EntryType::JOB) {
                return true;
            }
            if ($entry->type === EntryType::MAIL) {
                return true;
            }

            return $entry->hasMonitoredTag();
        });
    }

    /**
     * Prevent sensitive request details from being logged by Telescope.
     */
    protected function hideSensitiveRequestDetails(): void
    {
        if ($this->app->environment('local')) {
            return;
        }

        Telescope::hideRequestParameters(['_token']);

        Telescope::hideRequestHeaders([
            'cookie',
            'x-csrf-token',
            'x-xsrf-token',
        ]);
    }

    /**
     * Register the Telescope gate.
     *
     * This gate determines who can access Telescope in non-local environments.
     */
    #[Override]
    protected function gate(): void
    {
        Gate::define('viewTelescope', fn ($user): bool => $user->email === 'franklinomarflores@gmail.com');
    }
}
