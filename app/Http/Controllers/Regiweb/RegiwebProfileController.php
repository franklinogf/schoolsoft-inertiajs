<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RegiwebProfileController extends Controller
{

    /**
     * Display the resource.
     */
    public function show(Request $request)
    {
        return Inertia::render('Regiweb/Profile', ['profile_picture' => Storage::path($request->user()->foto_name)]);
    }


    /**
     * Update the resource in storage.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $data = $request->all();
        if ($request->hasFile('picture')) {
            if ($request->user()->foto_name !== null) {
                Storage::delete($request->user()->foto_name);
            }
            $picturePath = $request->file('picture')->store('teacher/profile_picture');
            $data['foto_name'] = $picturePath;

        }
        unset($data['picture']);
        $request->user()->fill($data);
        $request->user()->save();
        return to_route('regiweb.profile.show');

    }

}
