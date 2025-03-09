<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Stancl\Tenancy;
use Stancl\Tenancy\Resolvers\PathTenantResolver;
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
        $configs = [
            'locale' => 'app.locale',
        ];
        if (! app()->isLocal()) {
            $configs = array_merge($configs, [
                'default_mailer' => 'mail.default',
                'default_mail_from' => 'mail.from.address',
                'resend_key' => 'services.resend.key',
                'smtp_host' => 'mail.mailers.smtp.host',
                'smtp_port' => 'mail.mailers.smtp.port',
                'smtp_username' => 'mail.mailers.smtp.username',
                'smtp_password' => 'mail.mailers.smtp.password',
                'smtp_encryption' => 'mail.mailers.smtp.encryption',
            ]);
        }

        Tenancy\Features\TenantConfig::$storageToConfigMap = $configs;

        Tenancy\Middleware\InitializeTenancyByPath::$onFail = function () {
            return abort(Response::HTTP_NOT_FOUND);
        };

        Tenancy\Controllers\TenantAssetsController::$tenancyMiddleware = Tenancy\Middleware\InitializeTenancyByPath::class;

        Tenancy\Resolvers\PathTenantResolver::$tenantParameterName = 'school';

        // enable cache
        PathTenantResolver::$shouldCache = true;

        // cache for 1 hour
        PathTenantResolver::$cacheTTL = 60 * 60;
    }
}
