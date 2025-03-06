<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TemporaryFile extends Model
{
    protected $fillable = [
        'folder',
        'filename',
    ];

    protected static function booted()
    {
        static::deleting(function (TemporaryFile $temporaryFile) {
            Log::info("Deleting temporary file folder {$temporaryFile->folder}");
            Storage::disk('local')->deleteDirectory("tmp/{$temporaryFile->folder}");
        });
    }
}
