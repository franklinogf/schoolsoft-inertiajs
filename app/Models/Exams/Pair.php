<?php

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

class Pair extends Model
{
    protected $table = 'T_examen_parea';

    public $timestamps = false;

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }

    public function answer()
    {
        return $this->hasOne(PairCode::class, 'id', 'respuesta_c');
    }
}
