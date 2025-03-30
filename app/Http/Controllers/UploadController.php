<?php

namespace App\Http\Controllers;

use App\Models\TemporaryFile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UploadController extends Controller
{
    public function store(Request $request): Response
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

            return response($folder, 200);

        }

        return response('', 200);

    }

    public function destroy(Request $request): Response
    {
        $folder = $request->getContent();
        $temporaryFile = TemporaryFile::where('folder', $folder)->first();

        if ($temporaryFile) {
            $temporaryFile->delete();
        }

        return response('', 200);

    }
}
