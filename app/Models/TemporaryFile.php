<?php

declare(strict_types=1);

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
final class TemporaryFile extends Model
{
    protected $fillable = [
        'folder',
        'filename',
    ];

    public function moveTo(string $path): bool
    {

        $moved = Storage::disk('local')->move(
            tmp_path($this->folder, $this->filename),
            $path
        );

        $this->delete();

        return $moved;
    }

    protected static function booted(): void
    {
        self::deleting(function (TemporaryFile $temporaryFile): void {
            Log::info("Deleting temporary file folder {$temporaryFile->folder}");
            Storage::disk('local')->deleteDirectory("tmp/{$temporaryFile->folder}");
        });
    }
}
