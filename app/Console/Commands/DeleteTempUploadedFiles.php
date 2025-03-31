<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\TemporaryFile;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

final class DeleteTempUploadedFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-temp-uploaded-files';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete temporary uploaded files older than 24 hours.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info('Deleting temporary uploaded files older than 24 hours.');
        TemporaryFile::whereDate('created_at', '<', now()->subDay())->get()->each(function (TemporaryFile $temporaryFile): void {
            $this->line("Deleting temporary file folder {$temporaryFile->folder}");
            $temporaryFile->delete();
        });
        $this->info('Temporary uploaded files older than 24 hours have been deleted.');

        $this->info('Deleting temporary uploaded files that still exist older than 24 hours.');
        $storage = Storage::disk('local');
        $directories = $storage->directories('tmp');

        if (empty($directories)) {
            $this->info('No temporary uploaded files older than 24 hours exist.');

            return;
        }

        foreach ($directories as $directory) {
            $directoryLastModified = Carbon::createFromTimestamp($storage->lastModified($directory));

            if (now()->diffInHours($directoryLastModified) > 24) {
                $storage->deleteDirectory($directory);
            }
        }
        $this->info('Temporary uploaded files that still exist older than 24 hours have been deleted.');
    }
}
