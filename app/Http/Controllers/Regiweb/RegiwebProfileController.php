<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\ProfileUpdateRequest;
use App\Http\Requests\TeacherRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->all());
        $request->user()->save();
        return to_route('regiweb.profile.show');

    }

}
