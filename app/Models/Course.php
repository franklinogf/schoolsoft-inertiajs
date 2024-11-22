<?php

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[ScopedBy(SchoolYear::class)]
class Course extends Model
{
    public $timestamps = false;

    protected $table = 'cursos';

    protected $primaryKey = 'mt';

    protected function descripcion(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => app()->getLocale() === 'es'
            ? $attributes['desc1']
            : ($attributes['desc2'] === '' ? $attributes['desc1'] : $attributes['desc2']),
        );
    }
}
