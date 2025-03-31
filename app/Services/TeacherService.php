<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\MediaCollectionEnum;
use App\Models\Teacher;
use App\Models\TemporaryFile;

final class TeacherService
{
    public function create(array $data): Teacher
    {
        return Teacher::create($data);
    }

    public function update(Teacher $teacher, array $data): Teacher
    {

        return tap($teacher)->update($data);

    }

    public function delete(Teacher $teacher): bool
    {

        return $teacher->delete();

    }

    public function addProfilePicture(Teacher $teacher, string $folder): void
    {
        $temporaryFile = tenancy()->central(
            fn (): ?TemporaryFile => TemporaryFile::where('folder', $folder)->first()
        );

        if ($temporaryFile) {
            $teacher->addMediaFromDisk(tmp_path($folder, $temporaryFile->filename), 'local')
                ->toMediaCollection(MediaCollectionEnum::PROFILE_PICTURE->value);
            $temporaryFile->delete();
        }
    }
}
