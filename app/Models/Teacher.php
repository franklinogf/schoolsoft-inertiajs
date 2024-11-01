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
    // protected $authPasswordName = 'clave';

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'grado', 'grado');
    }

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class, 'id', 'id')->where('year', Admin::primary()->year2);
    }

    protected function casts(): array
    {
        $nullToEmptyStringColumns = [
            'email2',
            'preparacion1',
            'preparacion2',
            'pueblo2',
            'dir2',
            'dir3',
            'dir4',
            'esta2',
            'zip2',
            'alias',
            'pe1',
            'pe2',
            'pe3',
            'pe4',
            'pe5',
            'pe6',
            'pe7',
            'pe8',
            'pe9',
            'pe10',
            'pe11',
            'pe12',
            'pe13',
            'pe14',
            'pe15',
            'pe16',
        ];
        $datesColumns = [
            'fecha_daja',
            'fecha_nac',
            'fecha_ini',
            'fex1',
            'fex2',
            'fex3',
            'fex4',
        ];
        $array = [
            'genero' => Gender::class,
            'foto_name' => ProfilePicture::class,
            'lp1' => YesNo::class,
            'lp2' => YesNo::class,
            'lp3' => YesNo::class,
            'lp4' => YesNo::class,
        ];
        foreach ($datesColumns as $column) {
            $array[$column] = Date::class;
        }
        foreach ($nullToEmptyStringColumns as $column) {
            $array[$column] = NullToEmptyString::class;
        }
        return $array;
    }
}
