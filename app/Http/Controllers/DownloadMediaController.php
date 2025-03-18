<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class DownloadMediaController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Media $media)
    {
        return $media;
    }
}
