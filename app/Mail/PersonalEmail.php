<?php

namespace App\Mail;

use App\Models\Admin;
use App\Models\TemporaryFile;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PersonalEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $message,
        public ?array $files = null
    ) {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: null,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.personal-email',
            with: ['school' => Admin::getPrimaryAdmin()->first()->colegio]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        if ($this->files === null) {
            return [];
        }

        $attachments = [];

        tenancy()->central(function () use (&$attachments) {

            foreach ($this->files as $folder) {

                $temporaryFile = TemporaryFile::where('folder', $folder)->first();

                if ($temporaryFile) {

                    $attachments[] = Attachment::fromStorageDisk('local', "tmp/{$folder}/{$temporaryFile->filename}");

                }
            }

        });

        return $attachments;
    }
}
