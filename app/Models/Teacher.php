<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Support\Facades\Storage;

class Teacher extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $table = 'profesor';

    protected $hidden = [
        'clave',
    ];

    protected $guarded = [];

    public function getFullNameAttribute()
    {
        return "$this->nombre, $this->apellidos";
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'grado', 'grado');
    }

    public function fotoName(): Attribute
    {
        return Attribute::make(
            get: function (string $value): string|null {
                return $value !== '' && Storage::exists($value) ? $value : null;
            }
        );
    }
}
