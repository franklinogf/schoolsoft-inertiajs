<?php

namespace App\Http\Controllers;

use App\Models\TemporaryFile;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        if ($request->hasFile('filepond')) {
            $file = $request->file('filepond');
            $filename = $file->getClientOriginalName();
            $folder = uniqid().'-'.now()->timestamp;
            $path = "tmp/{$folder}";
            $file->storeAs($path, $filename, 'local');

            TemporaryFile::create([
                'folder' => $folder,
                'filename' => $filename,
            ]);

            return $folder;

        }

        return '';

    }

    public function destroy(Request $request)
    {
        $folder = $request->getContent();
        $temporaryFile = TemporaryFile::where('folder', $folder)->first();

        if ($temporaryFile) {
            $temporaryFile->delete();
        }

        return '';

    }
}
