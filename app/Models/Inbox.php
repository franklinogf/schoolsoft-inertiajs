<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Scopes\DescendingScope;
use App\Observers\InboxObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Casts\AsStringable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[ObservedBy([InboxObserver::class])]
#[ScopedBy([DescendingScope::class])]
final class Inbox extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $casts = [
        'is_deleted' => 'boolean',
        'subject' => AsStringable::class,
        'message' => AsStringable::class,
    ];

    public function sender(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the messages that are replies to this inbox message.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function teachers(): MorphToMany
    {
        return $this->morphedByMany(Teacher::class, 'receiver', 'inboxebles')
            ->withPivot('is_read', 'is_deleted');
    }

    public function students(): MorphToMany
    {
        return $this->morphedByMany(Student::class, 'receiver', 'inboxebles')
            ->withPivot('is_read', 'is_deleted');
    }

    public function admins(): MorphToMany
    {
        return $this->morphedByMany(Admin::class, 'receiver', 'inboxebles')
            ->withPivot('is_read', 'is_deleted');
    }
}
