<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public $timestamps = false;

    protected $table = 'cursos';

    protected $primaryKey = 'mt';

    protected function descripcion(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => app()->getLocale() === 'es'
            ? $attributes['desc1']
            : ($attributes['desc2'] === '' ? $attributes['desc1'] : $attributes['desc2']),
        );
    }

}
