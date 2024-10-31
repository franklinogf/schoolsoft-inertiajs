<?php

namespace App\Models;

use App\Casts\Date;
use App\Casts\Gender;
use App\Casts\NullToEmptyString;
use App\Casts\ProfilePicture;
use App\Casts\YesNo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Model;

class Teacher extends Model
{

    public $timestamps = false;

    protected $table = 'profesor';

    protected $hidden = [
        'clave',
    ];


    protected $guarded = [];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'grado', 'grado');
    }


    protected function casts(): array
    {
        return [
            'fecha_daja' => Date::class,
            'fecha_nac' => Date::class,
            'fecha_ini' => Date::class,
            'fex1' => Date::class,
            'fex2' => Date::class,
            'fex3' => Date::class,
            'fex4' => Date::class,
            'genero' => Gender::class,
            'foto_name' => ProfilePicture::class,
            'lp1' => YesNo::class,
            'lp2' => YesNo::class,
            'lp3' => YesNo::class,
            'lp4' => YesNo::class,
            'email2' => NullToEmptyString::class,
            'pueblo2' => NullToEmptyString::class,
            'dir2' => NullToEmptyString::class,
            'dir3' => NullToEmptyString::class,
            'dir4' => NullToEmptyString::class,
            'esta2' => NullToEmptyString::class,
            'zip2' => NullToEmptyString::class,
            'alias' => NullToEmptyString::class,
        ];
    }
}
