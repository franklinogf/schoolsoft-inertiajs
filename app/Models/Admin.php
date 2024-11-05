<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Model;

class Admin extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $table = 'colegio';

    protected $hidden = [
        'clave',
    ];

    protected $guarded = [];

    /**
     * Scope a query to only include active users.
     */
    public function scopePrimary(Builder $query)
    {
        return $query->where('usuario', 'administrador')->first();
    }

    public function getYear(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['year'],
        );
    }
}
