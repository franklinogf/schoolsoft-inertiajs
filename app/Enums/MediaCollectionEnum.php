<?php

declare(strict_types=1);

namespace App\Enums;

enum MediaCollectionEnum: string
{
    case PROFILE_PICTURE = 'profile_picture';
    case INBOX_ATTACHMENT = 'inbox_attachment';

}
