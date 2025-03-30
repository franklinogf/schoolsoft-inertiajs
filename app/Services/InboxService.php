<?php

namespace App\Services;

use App\Enums\MediaCollectionEnum;
use App\Models\Admin;
use App\Models\Inbox;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\TemporaryFile;
use Illuminate\Database\Eloquent\Collection;

class InboxService
{
    /**
     * @param  array<string>  $folders
     */
    public function addAttachments(Inbox $inbox, array $folders): void
    {
        if (empty($folders)) {
            return;
        }

        $temporaryFiles = tenancy()->central(fn () => TemporaryFile::whereIn('folder', $folders)->get());

        foreach ($temporaryFiles as $temporaryFile) {
            $inbox->addMediaFromDisk(tmp_path($temporaryFile->folder, $temporaryFile->filename), 'local')
                ->toMediaCollection(MediaCollectionEnum::INBOX_ATTACHMENT->value);
            $temporaryFile->delete();
        }
    }

    private function send(Teacher|Student|Admin $sender, string $subject, string $message): Inbox
    {
        $inbox = $sender->sentMessages()->create([
            'subject' => $subject,
            'message' => $message,
        ]);

        return $inbox;
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Collection<int,\App\Models\Student>  $to
     */
    public function sendToStudents(Teacher|Student|Admin $sender, Collection $to, string $subject, string $message): Inbox
    {

        $inbox = $this->send($sender, $subject, $message);
        $inbox->students()->attach($to);

        return $inbox;
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Collection<int,\App\Models\Teacher>  $to
     */
    public function sendToTeachers(Teacher|Student|Admin $sender, Collection $to, string $subject, string $message): Inbox
    {
        $inbox = $this->send($sender, $subject, $message);
        $inbox->teachers()->attach($to);

        return $inbox;
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Collection<int,\App\Models\Admin>  $to
     */
    public function sendToAdmins(Teacher|Student|Admin $sender, Collection $to, string $subject, string $message): Inbox
    {
        $inbox = $this->send($sender, $subject, $message);
        $inbox->admins()->attach($to);

        return $inbox;
    }
}
