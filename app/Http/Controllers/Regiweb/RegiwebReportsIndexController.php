<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

final class RegiwebReportsIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        auth()->user()->load('courses');

        return inertia('Regiweb/Reports/Index');
    }
}
