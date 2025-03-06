<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Stancl\Tenancy;
use Symfony\Component\HttpFoundation\Response;

class TenantProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Tenancy\Features\TenantConfig::$storageToConfigMap = [
            'mail_from' => 'mail.from.address',
            'enviroments.resend_key.value' => 'services.resend.key',
            'default_mailer' => 'mail.default',
        ];
        Tenancy\Middleware\InitializeTenancyByPath::$onFail = function () {
            return abort(Response::HTTP_NOT_FOUND);
        };

        Tenancy\Controllers\TenantAssetsController::$tenancyMiddleware = Tenancy\Middleware\InitializeTenancyByPath::class;
        Tenancy\Resolvers\PathTenantResolver::$tenantParameterName = 'school';
    }
}
