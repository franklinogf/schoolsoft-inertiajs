<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Inbox;

final class InboxObserver
{
    /**
     * Handle the Inbox "created" event.
     */
    public function created(): void
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
    public function updated(): void
    {
        //
    }

    /**
     * Handle the Inbox "deleted" event.
     */
    public function deleted(): void
    {
        //
    }

    /**
     * Handle the Inbox "restored" event.
     */
    public function restored(): void
    {
        //
    }

    /**
     * Handle the Inbox "force deleted" event.
     */
    public function forceDeleted(): void
    {
        //
    }
}
