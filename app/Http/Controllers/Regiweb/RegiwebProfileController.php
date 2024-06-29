<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegiwebProfileController extends Controller
{

    /**
     * Display the resource.
     */
    public function show()
    {
        return Inertia::render('Regiweb/Profile');
    }


    /**
     * Update the resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

}
