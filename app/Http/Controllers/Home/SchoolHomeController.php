<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SchoolHomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $school = DB::table('colegio')->where('usuario', 'administrador')->first();
        return Inertia::render('Home/Index', [
            'school' => $school
        ]);
    }
}
