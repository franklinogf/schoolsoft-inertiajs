<?php

declare(strict_types=1);

use App\Models\TemporaryFile;

test('to array', function () {
    $temporaryFile = TemporaryFile::factory()->create()->fresh();
    expect(array_keys($temporaryFile->toArray()))->toBe([
        'id',
        'folder',
        'filename',
        'created_at',
        'updated_at',
    ]);
});

test('returns the full path of the file', function () {
    $temporaryFile = TemporaryFile::factory()->create([
        'folder' => 'test-folder',
        'filename' => 'test-file.txt',
    ])->fresh();

    expect($temporaryFile->getFullPath())->toBe(tmp_path('test-folder', 'test-file.txt'));
});

test('deletes the file directory when the model is deleted', function () {
    Storage::fake('local');

    $folder = 'test-folder';

    Storage::disk('local')->makeDirectory(tmp_path($folder));

    $temporaryFile = TemporaryFile::factory()->create([
        'folder' => $folder,
        'filename' => 'test-file.txt',
    ])->fresh();

    $temporaryFile->delete();

    Storage::disk('local')->assertMissing(tmp_path($folder));
});
