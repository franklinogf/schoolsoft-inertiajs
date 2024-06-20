<?php
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Resolvers\PathTenantResolver;

Route::middleware('tenant')->prefix("{" . PathTenantResolver::$tenantParameterName . "}")->group(function () {

});