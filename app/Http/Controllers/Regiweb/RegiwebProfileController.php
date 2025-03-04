<?php

namespace App\Http\Controllers\Regiweb;

use App\Enums\StoragePathEnum;
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
                Storage::delete($request->user()->foto_name);
            }
            $picturePath = Storage::put(StoragePathEnum::TEACHERS_PROFILE_PICTURES->value, $request->file('picture'));
            $request->user()->foto_name = $picturePath;
        }

        $request->user()->save();

        return back()->with('success', __('Profile updated successfully'));

    }
}
