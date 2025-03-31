<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Enums\MediaCollectionEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Override;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

final class InboxResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    #[Override]
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sender' => $this->sender,
            'receivers' => collect()
                ->merge($this->teachers)
                ->merge($this->students)
                ->merge($this->admins),
            'subject' => $this->subject,
            'message' => $this->message,
            'replies' => $this->collection($this->replies),
            'preview' => strip_tags((string) $this->message->limit(20)),
            'is_deleted' => (bool) ($this->pivot?->is_deleted ?? $this->is_deleted),
            'is_read' => (bool) ($this->pivot?->is_read ?? true),
            'datetime' => $this->created_at->format('Y-m-d H:i:s'),
            'datetime_human_readeable' => $this->created_at->diffForHumans(),
            'date' => $this->created_at->format('Y-m-d'),
            'time' => $this->created_at->format('H:i:s'),
            'attachments' => $this->getMedia(MediaCollectionEnum::INBOX_ATTACHMENT->value)->map(fn (Media $media): array => [
                'id' => $media->id,
                'name' => $media->name,
                'url' => $media->getUrl(),
                'size' => $media->size,
                'type' => $media->mime_type,
            ]),
        ];
    }
}
