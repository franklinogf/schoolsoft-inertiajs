<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegiwebReportsIndexController extends Controller
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
