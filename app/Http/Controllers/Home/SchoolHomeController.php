<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolHomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $school = Admin::getPrimaryAdmin()->first();

        return Inertia::render('Home/Index', [
            'school' => $school,
        ]);
    }
}
