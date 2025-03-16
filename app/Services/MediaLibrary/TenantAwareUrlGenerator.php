<?php

namespace App\Services\MediaLibrary;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\UrlGenerator\DefaultUrlGenerator;

class TenantAwareUrlGenerator extends DefaultUrlGenerator
{
    /*
     * Get the path for the given media, relative to the root storage path.
     */
    public function getUrl(): string
    {
        $url = tenant_file_url($this->getPathRelativeToRoot());

        $url = $this->versionUrl($url);

        return $url;
    }
}
