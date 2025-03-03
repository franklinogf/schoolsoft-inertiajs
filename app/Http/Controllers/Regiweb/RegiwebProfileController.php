<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\ProfileUpdateRequest;
use Illuminate\Support\Facades\Storage;
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
        $data = $request->validated();
        $request->user()->fill($data);
        if ($request->hasFile('picture')) {
            if ($request->user()->foto_name !== null) {
                Storage::delete(get_tenant_uploaded_file_path($request->user()->foto_name));
            }
            $picturePath = $request->file('picture')->storePublicly('profile_pictures/teacher');
            $request->user()->foto_name = $picturePath;
        }

        $request->user()->save();

        return back()->with('success', __('Profile updated successfully'));

    }
}
