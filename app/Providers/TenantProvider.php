<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Stancl\Tenancy;
use Stancl\Tenancy\Resolvers\PathTenantResolver;
use Symfony\Component\HttpFoundation\Response;

final class TenantProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    #[\Override]
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
            ...$this->theme(),
            'theme.current' => 'theme.current',
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

        Tenancy\Middleware\InitializeTenancyByPath::$onFail = (fn() => abort(Response::HTTP_NOT_FOUND));

        Tenancy\Controllers\TenantAssetsController::$tenancyMiddleware = Tenancy\Middleware\InitializeTenancyByPath::class;

        PathTenantResolver::$tenantParameterName = 'school';

        // enable cache
        PathTenantResolver::$shouldCache = true;

        // cache for 1 hour
        PathTenantResolver::$cacheTTL = 60 * 60;

        // use the file cache store
        PathTenantResolver::$cacheStore = 'file';
    }

    /**
     * Get the theme configuration.
     *
     * @return array<string, string>
     *
     * @psalm-return array{theme.themes.light: string, theme.themes.dark: string}
     */
    private function theme(): array
    {
        $theme = [];

        foreach (config('theme.themes') as $mode => $variables) {
            foreach ($variables as $variable => $_) {
                $theme["theme.themes.{$mode}.{$variable}"] = "theme.themes.{$mode}.{$variable}";
            }
        }

        return $theme;
    }
}
