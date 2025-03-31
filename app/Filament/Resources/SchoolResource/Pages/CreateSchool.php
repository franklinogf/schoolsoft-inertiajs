<?php

declare(strict_types=1);

namespace App\Filament\Resources\SchoolResource\Pages;

use App\Filament\Resources\SchoolResource;
use Filament\Resources\Pages\CreateRecord;

final class CreateSchool extends CreateRecord
{
    protected static string $resource = SchoolResource::class;
}
