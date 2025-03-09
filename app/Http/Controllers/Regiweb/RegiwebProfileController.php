<?php

namespace App\Http\Controllers\Regiweb;

use App\Enums\StoragePathEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\ProfileUpdateRequest;
use App\Models\TemporaryFile;
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
        $validated = $request->validated();
        $data = $request->safe()->except('picture');
        $user = $request->user();
        $user->fill($data);

        $folder = $validated['picture'];
        if ($folder !== null) {

            if ($user->foto_name !== null) {
                Storage::delete($user->foto_name);
            }

            $temporaryFile = tenancy()->central(function () use ($folder) {
                return TemporaryFile::where('folder', $folder)->first();
            });

            $picturePath = StoragePathEnum::TEACHERS_PROFILE_PICTURES->value.'/'.$user->id.get_extension($temporaryFile->filename);

            $temporaryFile->moveTo(public_tenant_path($picturePath));

            $user->foto_name = $picturePath;
        }

        $user->save();

        return back()->with('success', __('Perfil actualizado con éxito'));

    }
}
