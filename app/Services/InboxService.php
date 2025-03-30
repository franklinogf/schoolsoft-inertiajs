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

    /**
     * @param  array<string>  $attachments
     */
    private function send(Teacher|Student|Admin $sender, string $subject, string $message, array $attachments = []): Inbox
    {
        $inbox = $sender->sentMessages()->create([
            'subject' => $subject,
            'message' => $message,
        ]);

        $this->addAttachments($inbox, $attachments);

        return $inbox;
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Collection<int,\App\Models\Student>  $to.
     * @param  array<string>  $attachments
     */
    public function sendToStudents(Teacher|Student|Admin $sender, Collection $to, string $subject, string $message, array $attachments = []): Inbox
    {

        $inbox = $this->send($sender, $subject, $message, $attachments);
        $inbox->students()->attach($to);

        return $inbox;
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Collection<int,\App\Models\Teacher>  $to
     * @param  array<string>  $attachments
     */
    public function sendToTeachers(Teacher|Student|Admin $sender, Collection $to, string $subject, string $message, array $attachments = []): Inbox
    {
        $inbox = $this->send($sender, $subject, $message, $attachments);
        $inbox->teachers()->attach($to);

        return $inbox;
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Collection<int,\App\Models\Admin>  $to
     * @param  array<string>  $attachments
     */
    public function sendToAdmins(Teacher|Student|Admin $sender, Collection $to, string $subject, string $message, array $attachments = []): Inbox
    {
        $inbox = $this->send($sender, $subject, $message, $attachments);
        $inbox->admins()->attach($to);

        return $inbox;
    }
}
