<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Model;

class Parents extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $table = 'madre';

    protected $hidden = [
        'clave',
    ];

    protected $guarded = [];
}
