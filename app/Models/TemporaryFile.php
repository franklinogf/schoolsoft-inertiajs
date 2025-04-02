<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
    use HasFactory;

    public function getFullPath(): string
    {
        return tmp_path($this->folder, $this->filename);
    }

    protected static function booted(): void
    {
        self::deleting(function (TemporaryFile $temporaryFile): void {
            Log::info("Deleting temporary file folder {$temporaryFile->folder}");
            Storage::disk('local')->deleteDirectory(tmp_path($temporaryFile->folder));
        });
    }
}
