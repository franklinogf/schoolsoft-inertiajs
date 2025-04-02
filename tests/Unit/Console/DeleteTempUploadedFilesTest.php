<?php

declare(strict_types=1);

use App\Console\Commands\DeleteTempUploadedFiles;
use App\Models\TemporaryFile;
use Illuminate\Support\Facades\Storage;

test('command runs successfully and outputs messages', function () {
    $this->artisan(DeleteTempUploadedFiles::class)
        ->expectsOutput('Deleting temporary uploaded files older than 24 hours.')
        ->expectsOutput('Temporary uploaded files older than 24 hours have been deleted.')
        ->expectsOutput('Deleting temporary uploaded files that still exist older than 24 hours.')
        ->expectsOutput('No temporary uploaded files older than 24 hours exist.')
        ->assertExitCode(0);
});

test('deletes database records older than 24 hours', function () {
    $oldFile = TemporaryFile::factory()->create(['created_at' => now()->subDays(2)]);
    $recentFile = TemporaryFile::factory()->create(['created_at' => now()]);

    $this->artisan(DeleteTempUploadedFiles::class);

    expect(TemporaryFile::find($oldFile->id))->toBeNull();
    expect(TemporaryFile::find($recentFile->id))->not->toBeNull();
});

test('deletes directories older than 24 hours', function () {
    Storage::fake('local');
    $directory = tmp_path('old-folder', 'file.txt');

    Storage::disk('local')->put($directory, 'content');

    $this->travel(2)->days();

    $this->artisan(DeleteTempUploadedFiles::class);

    Storage::disk('local')->assertMissing($directory);

});

test('handles no directories gracefully', function () {
    $this->artisan(DeleteTempUploadedFiles::class)
        ->expectsOutput('No temporary uploaded files older than 24 hours exist.')
        ->assertExitCode(0);
});
