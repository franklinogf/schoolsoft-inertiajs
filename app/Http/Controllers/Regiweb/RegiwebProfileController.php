<?php

namespace App\Http\Controllers\Regiweb;

use App\Enums\MediaCollectionEnum;
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
        /**
         * @var \App\Models\Teacher $user
         */
        $user = $request->user();
        $user->fill($data);

        $folder = $validated['picture'];
        if ($folder !== null) {

            $temporaryFile = tenancy()->central(function () use ($folder): TemporaryFile|null {
                return TemporaryFile::where('folder', $folder)->first();
            });

            if ($temporaryFile) {
                $user->addMediaFromDisk(tmp_path($folder, $temporaryFile->filename), 'local')
                    ->toMediaCollection(MediaCollectionEnum::PROFILE_PICTURE->value);
                $temporaryFile->delete();
            }
        }

        $user->save();

        return back()->with('success', __('Perfil actualizado con éxito'));

    }
}
