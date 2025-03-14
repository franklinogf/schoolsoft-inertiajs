<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
    public function scopeGetPrimaryAdmin(Builder $query)
    {
        return $query->where('usuario', 'administrador');
    }

    public function getYear(): string
    {
        return $this->year;
    }
}
