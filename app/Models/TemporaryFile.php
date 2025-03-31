<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $folder
 * @property string $filename
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class TemporaryFile extends Model
{
    protected $fillable = [
        'folder',
        'filename',
    ];

    #[\Override]
    protected static function booted()
    {
        static::deleting(function (TemporaryFile $temporaryFile): void {
            Log::info("Deleting temporary file folder {$temporaryFile->folder}");
            Storage::disk('local')->deleteDirectory("tmp/{$temporaryFile->folder}");
        });
    }

    public function moveTo(string $path): bool
    {

        $moved = Storage::disk('local')->move(
            tmp_path($this->folder, $this->filename),
            $path
        );

        $this->delete();

        return $moved;
    }
}
