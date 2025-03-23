<?php

namespace App\Models\Exams;

use App\Casts\Date;
use App\Casts\YesNo;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $table = 'T_examenes';

    public $timestamps = false;

    protected $casts = [
        'fecha' => Date::class,
        'activo' => YesNo::class,
        'ver_nota' => YesNo::class,
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'id_maestro');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'id_examen');
    }

    public function truesOrFalses()
    {
        return $this->hasMany(TrueOrFalse::class, 'id_examen');
    }

    public function selects()
    {
        return $this->hasMany(Select::class, 'id_examen');
    }

    public function pairs()
    {
        return $this->hasMany(Pair::class, 'id_examen');
    }

    public function pairsCodes()
    {
        return $this->hasMany(PairCode::class, 'id_examen');
    }

    public function blankLines()
    {
        return $this->hasMany(BlankLine::class, 'id_examen');
    }
}
