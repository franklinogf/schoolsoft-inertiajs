<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\ProfileUpdateRequest;
use App\Services\TeacherService;
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
    public function update(ProfileUpdateRequest $request, TeacherService $teacherService)
    {
        $validated = $request->validated();
        $data = $request->safe()->except('picture');
        $folder = $validated['picture'];

        $user = $request->user();

        $teacherService->update($user, $data);

        if ($folder !== null) {

            $teacherService->addProfilePicture($user, $folder);
        }

        return back()->with('success', __('Perfil actualizado con éxito'));

    }
}
