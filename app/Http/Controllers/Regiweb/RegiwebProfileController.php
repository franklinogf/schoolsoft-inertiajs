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
        $picture = $request->user()->foto_name ? tenant_asset($request->user()->foto_name) : null;
        return Inertia::render('Regiweb/Profile', ['profile_picture' => $picture]);
    }


    /**
     * Update the resource in storage.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $data = $request->validated();
        $request->user()->fill($data);
        if ($request->hasFile('picture')) {
            if ($request->user()->foto_name !== null) {
                Storage::delete($request->user()->foto_name);
            }
            $picturePath = $request->file('picture')->store('teacher/profile_picture');
            dd($picturePath);
            $request->user()->foto_name = $picturePath;
        }

        $request->user()->save();
        return to_route('regiweb.profile.show');

    }

}
