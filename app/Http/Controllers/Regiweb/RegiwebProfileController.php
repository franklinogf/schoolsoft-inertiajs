<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RegiwebProfileController extends Controller
{

    /**
     * Display the resource.
     */
    public function show(Request $request)
    {


        return Inertia::render('Regiweb/Profile', ['profile_picture' => $request->user()->foto_name]);
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

            $request->user()->foto_name = create_tenant_file_url($picturePath);
        }

        $request->user()->save();
        return to_route('regiweb.profile.show');

    }

}
