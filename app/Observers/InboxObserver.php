<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Inbox;

final class InboxObserver
{
    /**
     * Handle the Inbox "created" event.
     */
    public function created(Inbox $inbox): void
    {
        //
    }

    public function creating(Inbox $inbox): void
    {
        $inbox->year = app('year');
    }

    /**
     * Handle the Inbox "updated" event.
     */
    public function updated(Inbox $inbox): void
    {
        //
    }

    /**
     * Handle the Inbox "deleted" event.
     */
    public function deleted(Inbox $inbox): void
    {
        //
    }

    /**
     * Handle the Inbox "restored" event.
     */
    public function restored(Inbox $inbox): void
    {
        //
    }

    /**
     * Handle the Inbox "force deleted" event.
     */
    public function forceDeleted(Inbox $inbox): void
    {
        //
    }
}
