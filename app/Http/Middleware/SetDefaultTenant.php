<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Stancl\Tenancy\Resolvers\PathTenantResolver;
use Symfony\Component\HttpFoundation\Response;

final class SetDefaultTenant
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $tenantPrefix = PathTenantResolver::$tenantParameterName;
        URL::defaults([$tenantPrefix => $request->route()->originalParameter($tenantPrefix)]);

        return $next($request);
    }
}
